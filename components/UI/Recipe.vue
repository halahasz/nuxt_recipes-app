<template>
  <div class="recipe-container">
    <nuxt-link class="recipe-card" :to="'/recipes/' + this.id">
      <article
        class="recipe-preview"
        :style="{
          'background-image': `url(${photo ||
            require(`@/assets/img/food-placeholder-${title.length % 5}.jpg`)})`
        }"
      >
        <h2>{{ title }}</h2>
      </article>
    </nuxt-link>
    <svg
      class="recipe-heart"
      v-if="liked"
      @click.stop="onSubmitted"
      xmlns="http://www.w3.org/2000/svg"
      width="26.211"
      height="23.432"
      viewBox="0 0 26.211 23.432"
    >
      <g
        id="Group_74"
        data-name="Group 74"
        transform="translate(-12.005 -16.033)"
      >
        <path
          id="Path_3"
          data-name="Path 3"
          d="M18.818,16.033A6.631,6.631,0,0,0,14,18.113a7.3,7.3,0,0,0-.011,10.014L24.606,39.262a.719.719,0,0,0,1,0q5.313-5.56,10.617-11.124a7.294,7.294,0,0,0,0-10.014,6.627,6.627,0,0,0-9.647,0l-1.466,1.52-1.466-1.531a6.548,6.548,0,0,0-4.829-2.08Z"
          transform="translate(0 0)"
          fill="#f86600"
        />
      </g>
    </svg>
    <svg
      class="recipe-heart"
      v-else
      @click.stop="onSubmitted"
      xmlns="http://www.w3.org/2000/svg"
      width="26.211"
      height="23.432"
      viewBox="0 0 26.211 23.432"
    >
      <path
        id="Path_3"
        data-name="Path 3"
        d="M18.818,16.033A6.631,6.631,0,0,0,14,18.113a7.3,7.3,0,0,0-.011,10.014L24.606,39.262a.719.719,0,0,0,1,0q5.313-5.56,10.617-11.124a7.294,7.294,0,0,0,0-10.014,6.627,6.627,0,0,0-9.647,0l-1.466,1.52-1.466-1.531a6.548,6.548,0,0,0-4.829-2.08Zm0,1.358a5.3,5.3,0,0,1,3.837,1.682l1.962,2.059a.718.718,0,0,0,1,0l1.951-2.048a5.206,5.206,0,0,1,7.664,0,5.914,5.914,0,0,1,0,8.106q-5.06,5.295-10.122,10.6L14.991,27.178a5.916,5.916,0,0,1,0-8.106A5.274,5.274,0,0,1,18.818,17.391Z"
        transform="translate(-12.005 -16.033)"
        fill="#fff"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Recipe",
  props: {
    id: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    liked: {
      type: Boolean,
      required: false
    },
    photo: {
      required: true
    },
    time: {
      required: false
    },
    author: {
      type: String,
      required: false
    },
    portions: {
      type: String,
      required: false
    },
    recipe: {
      required: false
    },
    ingredients: {
      required: false
    },
    date: {
      required: false
    }
  },
  data() {
    return {
      favouriteRecipe: this.recipe
        ? { ...this.recipe }
        : {
            title: "",
            id: this.$route.params.id,
            photo: "",
            link: "",
            time: "",
            author: "",
            portions: "",
            recipe: "",
            ingredients: [{ ingredient: "", amount: "" }],
            liked: false,
            date: null
          }
    };
  },
  computed: {
    ...mapState({
      loadedRecipes: state => state.loadedRecipes
    }),
    recipeLink() {
      return this.isAdmin ? "/admin/" + this.id : "/recipes/" + this.id;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    onSubmitted() {
      const editedRecipe = this.loadedRecipes.filter(
        recipe => recipe.id === this.id
      )[0];
      editedRecipe.liked = !editedRecipe.liked;
      if (!this.$cookies.get("token")) {
        // Save liked recipes in cookies
        if (editedRecipe.liked) {
          if (!this.$cookies.get("likedRecipes")) {
            const arr = [];
            arr.push(this.id);

            this.$cookies.set("likedRecipes", arr, {
              maxAge: 60 * 60 * 24 * 7
            });
          } else {
            const arr = this.$cookies.get("likedRecipes");
            arr.push(this.id);
            this.$cookies.remove("likedRecipes");
            this.$cookies.set("likedRecipes", arr, {
              maxAge: 60 * 60 * 24 * 7
            });
          }
        } else {
          if (!this.$cookies.get("likedRecipes")) {
            return;
          } else {
            const arr = this.$cookies.get("likedRecipes");
            const filteredArr = arr.filter(el => el != this.id);
            this.$cookies.remove("likedRecipes");
            this.$cookies.set("likedRecipes", filteredArr, {
              maxAge: 60 * 60 * 24 * 7
            });
            this.$store.dispatch("filterRecipes", this.id);
          }
        }
      } else {
        this.$store.dispatch("filterRecipes", this.id);
        this.$store.dispatch("editRecipe", {
          id: this.id,
          title: this.title,
          keywards: this.keywards,
          photo: this.photo,
          link: this.link,
          time: this.time,
          author: this.author,
          portions: this.portions,
          recipe: this.recipe,
          ingredients: this.ingredients,
          liked: !this.liked,
          order: !this.order,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1 < 10
              ? "0" + (new Date().getMonth() + 1)
              : new Date().getMonth()
          }-${
            new Date().getDate() < 10
              ? "0" + new Date().getDate()
              : new Date().getDate()
          }`
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe-container {
  position: relative;
  width: 33.333%;
  padding: 0 15px;
  @media (max-width: 1300px) {
    width: 50%;
  }
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0;
  }
}
.recipe-card {
  text-decoration: none;
}
.recipe-heart {
  cursor: pointer;
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
}
.recipe-preview {
  filter: brightness(1.3);
  width: 100%;
  margin: 0 auto;
  margin: 15px 0;
  height: 320px;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 3px 5px -1px rgba(158, 116, 88, 0.2),
    0px 6px 10px 0px rgba(158, 116, 88, 0.14),
    0px 1px 18px 0px rgba(158, 116, 88, 0.12);
  border-radius: 30px;
  position: relative;
  @media (max-width: 480px) {
    height: 400px;
  }
  &:before {
    content: "";
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.8));
    position: absolute;
    z-index: 1;
    border-radius: 30px;
  }
  h2 {
    width: 100%;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.9);
    font-size: 23px;
    position: relative;
    z-index: 1;
    padding: 0px 30px;
    top: 240px;
    @media (max-width: 480px) {
      top: 300px;
    }
  }
  img {
    position: absolute;
    z-index: 5;
    top: 40px;
    right: 40px;
    max-width: 400px;
  }
}
</style>
