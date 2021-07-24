<template>
  <div class="recipe-page">
    <div
      class="recipe-photo"
      :style="{
        'background-image': `url(${loadedRecipe.photo ||
          require(`@/assets/img/food-placeholder-${loadedRecipe.title.length %
            5}.jpg`)})`
      }"
    >
      <div class="recipe-photo__content">
        <svg
          class="heart"
          @click.stop="onSubmitted"
          v-if="loadedRecipe.liked"
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
          class="heart"
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
        <h1>{{ loadedRecipe.title }}</h1>
        <div class="recipe-photo__details">
          <div class="recipe-photo__details-data">
            <p>
              <span>On</span>
              {{ loadedRecipe.date }}
            </p>
            <p>
              <span>By</span>
              {{ loadedRecipe.author }}
            </p>
          </div>
          <div class="recipe-photo__details-links">
            <a
              v-if="loadedRecipe.link"
              :href="loadedRecipe.link"
              class="recipe-photo__link"
              target="_blank"
              >Link</a
            >
            <button
              class="btn-edit"
              @click="$router.push('/edit-recipe/' + $route.params.id)"
            >
              <svg
                height="484pt"
                viewBox="-15 -15 484.00019 484"
                width="484pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"
                  fill="#F86600"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <section class="recipe-content">
      <div class="recipe-content__headlines">
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
      <section v-if="isIngredients" class="recipe-ingredients">
        <div class="recipe-ingredients__header">
          <div class="recipe-ingredients__clock">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.778"
              height="14.778"
              viewBox="0 0 14.778 14.778"
            >
              <g
                id="Group_37"
                data-name="Group 37"
                transform="translate(-4.5 -4.5)"
              >
                <g
                  id="Group_36"
                  data-name="Group 36"
                  transform="translate(4.5 4.5)"
                >
                  <path
                    id="Path_16628"
                    data-name="Path 16628"
                    d="M13.145,6a7.145,7.145,0,1,0,7.145,7.145A7.15,7.15,0,0,0,13.145,6Zm0,.65a6.5,6.5,0,1,1-6.5,6.5A6.491,6.491,0,0,1,13.145,6.65ZM13.11,8.431a.325.325,0,0,0-.289.33v4.385a.325.325,0,0,0,.1.228l3.1,3.1a.325.325,0,0,0,.466-.453l-.009-.009-3-3V8.761a.325.325,0,0,0-.318-.332Z"
                    transform="translate(-5.756 -5.756)"
                    fill="#f86600"
                  />
                  <path
                    id="Path_16629"
                    data-name="Path 16629"
                    d="M11.889,19.278a7.389,7.389,0,1,1,7.389-7.389A7.4,7.4,0,0,1,11.889,19.278Zm0-14.291a6.9,6.9,0,1,0,6.9,6.9A6.909,6.909,0,0,0,11.889,4.987Zm0,13.641a6.739,6.739,0,1,1,6.739-6.739A6.747,6.747,0,0,1,11.889,18.628Zm0-12.991a6.252,6.252,0,1,0,6.252,6.252A6.259,6.259,0,0,0,11.889,5.637Zm3.105,9.923a.567.567,0,0,1-.408-.172l-3.1-3.1a.564.564,0,0,1-.168-.4V7.5a.564.564,0,0,1,.506-.572h0a.644.644,0,0,1,.075,0,.569.569,0,0,1,.556.58v4.142l2.933,2.933a.573.573,0,0,1,.172.416.568.568,0,0,1-.568.56Zm-3.1-8.144H11.88a.081.081,0,0,0-.072.082v4.39a.08.08,0,0,0,.024.055l3.1,3.1a.082.082,0,0,0,.117,0,.081.081,0,0,0,0-.115L11.97,11.853V7.5A.083.083,0,0,0,11.891,7.416Z"
                    transform="translate(-4.5 -4.5)"
                    fill="#f86600"
                  />
                </g>
              </g>
            </svg>
            <p>{{ loadedRecipe.time }}</p>
          </div>
          <p>{{ loadedRecipe.portions }} portions</p>
        </div>
        <div
          class="recipe-ingredients__ingredients"
          v-for="ingredient in loadedRecipe.ingredients"
          :key="ingredient.ingredient"
        >
          <p class="ingredient" @click="onClick">{{ ingredient.ingredient }}</p>
          <p>{{ ingredient.amount }}</p>
        </div>
      </section>
      <section v-if="isRecipe" class="recipe-recipe">
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

      // Save liked recipes in cookies
      if (this.loadedRecipe.liked) {
        if (!this.$cookies.get("likedRecipes")) {
          const arr = [];
          arr.push(this.loadedRecipe.id);
          this.$cookies.set("likedRecipes", arr, {
            maxAge: 60 * 60 * 24 * 7
          });
        } else {
          const arr = this.$cookies.get("likedRecipes");
          arr.push(this.loadedRecipe.id);
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
          const filteredArr = arr.filter(el => el != this.loadedRecipe.id);
          this.$cookies.remove("likedRecipes");
          this.$cookies.set("likedRecipes", filteredArr, {
            maxAge: 60 * 60 * 24 * 7
          });
        }
      }

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
        .catch(e => console.log(e));
    },
    onClick(e) {
      e.target.classList.toggle("ingredient-checked");
    }
  }
};
</script>
