<template>
  <div class="single-page">
    <div
      class="single-photo"
      :style="{ 'background-image': 'url(' + loadedRecipe.photo + ')' }"
    >
      <div class="single-photo__content">
        <!-- <img
          class="heart"
          @click.stop="onSubmitted"
          v-if="loadedRecipe.liked"
          src="~assets/img/heart_selected.svg"
        />
        <img
          class="heart"
          v-else
          @click.stop="onSubmitted"
          src="~assets/img/heart_white.svg"
        /> -->
        <h1>{{ loadedRecipe.title }}</h1>
        <div class="single-photo__details">
          <div class="single-photo__details-data">
            <p>
              <span>On</span>
              {{ loadedRecipe.date }}
            </p>
            <p>
              <span>By</span>
              {{ loadedRecipe.author }}
            </p>
          </div>
          <div class="single-photo__details-links">
            <a
              v-if="loadedRecipe.link"
              :href="loadedRecipe.link"
              class="single-photo__link"
              target="_blank"
              >Link</a
            >
            <button @click="$router.push('/edit-recipe/' + $route.params.id)">
              <!-- <img src="~assets/img/pen.svg" /> -->
            </button>
          </div>
        </div>
      </div>
    </div>
    <section class="single-content">
      <div class="single-content__headlines">
        <button
          :class="{ 'button-active': isIngredients }"
          @click="
            isIngredients = true;
            isRecipe = false;
          "
        >
          Ingredients
        </button>
        <button
          :class="{ 'button-active': isRecipe }"
          @click="
            isRecipe = true;
            isIngredients = false;
          "
        >
          Recipe
        </button>
      </div>
      <section v-if="isIngredients" class="single-ingredients">
        <div class="single-ingredients__header">
          <div class="single-ingredients__clock">
            <!-- <img src="~assets/img/clock.svg" /> -->
            <p>{{ loadedRecipe.time }}</p>
          </div>
          <p>{{ loadedRecipe.portions }} portions</p>
        </div>
        <div
          class="single-ingredients__ingredients"
          v-for="ingredient in loadedRecipe.ingredients"
          :key="ingredient.ingredient"
        >
          <p class="ingredient" @click="onClick">{{ ingredient.ingredient }}</p>
          <p>{{ ingredient.amount }}</p>
        </div>
      </section>
      <section v-if="isRecipe" class="single-recipe">
        <div v-html="loadedRecipe.recipe.replace(/\n/g, '<br />')"></div>
      </section>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isIngredients: true,
      isRecipe: false
    };
  },
  computed: {
    loadedRecipe() {
      return this.$store.getters.loadedRecipes.filter(
        recipe => recipe.id === this.$route.path.split("/")[2]
      )[0];
    }
  },
  methods: {
    onSubmitted() {
      this.loadedRecipe.liked = !this.loadedRecipe.liked;
      // this.$store.commit("editRecipe", this.loadedRecipe);
      axios
        .put(
          "https://recipes-6f5e0.firebaseio.com/recipes/" +
            this.loadedRecipe.id +
            ".json",
          {
            id: this.loadedRecipe.id,
            title: this.loadedRecipe.title,
            photo: this.loadedRecipe.photo,
            link: this.loadedRecipe.link,
            time: this.loadedRecipe.time,
            author: this.loadedRecipe.author,
            portions: this.loadedRecipe.portions,
            recipe: this.loadedRecipe.recipe,
            ingredients: this.loadedRecipe.ingredients,
            liked: this.loadedRecipe.liked,
            date: this.loadedRecipe.date
          }
        )
        .then(() => {
          this.$store.commit("editRecipe", this.loadedRecipe);
        })
        .catch(e => alert(e));
    },
    onClick(e) {
      e.target.classList.toggle("ingredient-checked");
    }
  }
};
</script>

<style scoped lang="scss">
.single-page {
  font-size: 14px;
}
.ingredient-checked {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: 10px;
    background: #fa6a18;
  }
}
.single-photo {
  height: 450px;
  top: 0;
  background-size: cover;
  background-position: center;
  position: sticky;
  &:before {
    content: "";
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.7));
    position: absolute;
    z-index: 1;
  }
  &__content {
    @media (min-width: 1000px) {
      width: 50%;
      margin-left: 25%;
    }
    padding: 0 25px;
    position: sticky;
    z-index: 3;
    top: 260px;
    h1 {
      font-size: 23px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: normal;
      margin-left: 0;
      margin-bottom: 20px;
      font-weight: 700;
    }
    &__link {
      color: #fa6a18;
      padding: 5px;
      text-decoration: none;
    }
    .heart {
      top: 80px;
      right: 30px;
      position: absolute;
      cursor: pointer;
    }
  }
  &__details {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    &-data {
      color: #fa6a18;
      p {
        margin-bottom: 9px;
        margin-top: 3px;
      }
      span {
        color: #fff;
      }
    }
  }
  &__details-links {
    display: flex;
    flex-direction: column;
  }
}

.single-content {
  margin-top: -40px;
  border-radius: 30px 30px 0 0;
  position: relative;
  z-index: 10;
  background-color: #fff;
  position: relative;
  &__headlines {
    @media (min-width: 1000px) {
      width: 50%;
      margin-left: 25%;
    }
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    padding: 40px 0 20px;
  }
}

.single-ingredients,
.single-recipe {
  @media (min-width: 1000px) {
    width: 50%;
    margin-left: 25%;
  }
  padding: 0 25px 115px;
}
.single-recipe {
  padding-top: 20px;
}
.single-ingredients__header {
  display: flex;
  justify-content: space-between;
  color: #fa6a18;
  margin-top: 15px;
  margin-bottom: 25px;
}
.single-ingredients__clock {
  display: flex;
  p {
    margin-left: 8px;
  }
}
.single-ingredients__ingredients {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
button {
  color: rgba(0, 0, 0, 0.3);
  outline: none;
  &:first-child {
    margin-right: -5px;
  }
  &:nth-child(2) {
    margin-left: -5px;
    &:before {
      right: 0;
    }
  }
  img {
    box-sizing: content-box;
    width: 20px;
    padding: 7px;
    margin-right: 5px;
  }
}
.button-active {
  color: #000;
  outline: none;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    height: 1px;
    width: 80%;
    background-color: #000;
    bottom: -4px;
  }
}
</style>
