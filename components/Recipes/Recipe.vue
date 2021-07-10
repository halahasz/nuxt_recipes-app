<template>
  <div class="recipe-container">
    <nuxt-link class="recipe-card" :to="recipeLink">
      <article
        class="recipe-preview"
        :style="{ 'background-image': 'url(' + photo + ')' }"
      >
        <h2>{{ title }}</h2>
      </article>
    </nuxt-link>
    <!-- <img
      class="recipe-heart"
      v-if="liked"
      @click.stop="onSubmitted"
      src="~assets/img/heart_selected.svg"
    />
    <img
      class="recipe-heart"
      v-else
      @click.stop="onSubmitted"
      src="~assets/img/heart_white.svg"
    /> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Recipe",
  props: {
    id: {
      type: String,
      required: false
    },
    isAdmin: {
      type: Boolean,
      requred: true
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
    }
  },
  methods: {
    onSubmitted() {
      const editedRecipe = this.loadedRecipes.filter(
        recipe => recipe.id === this.id
      )[0];
      editedRecipe.liked = !editedRecipe.liked;

      axios
        .put(
          "https://recipes-6f5e0.firebaseio.com/recipes/" + this.id + ".json",
          {
            id: this.id,
            title: this.title,
            photo: this.photo,
            link: this.link,
            time: this.time,
            author: this.author,
            portions: this.portions,
            recipe: this.recipe,
            ingredients: this.ingredients,
            liked: !this.liked,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1 < 10
                ? "0" + (new Date().getMonth() + 1)
                : new Date().getMonth()
            }-${
              new Date().getDate() < 10
                ? "0" + new Date().getDate()
                : new Date().getDate()
            }`
          }
        )
        .then(() => {
          this.$store.commit("editLikedRecipe", this.id, editedRecipe);
        })
        .catch(e => alert(e));
    }
  }
};
</script>

<style lang="scss">
.recipe-container {
  position: relative;
  width: 33%;
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
