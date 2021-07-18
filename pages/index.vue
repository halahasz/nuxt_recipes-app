<template>
  <div class="recipes-page">
    <RecipeSearch @search-text="searchText" />
    <h1>Last recipe</h1>
    <RecipeList :recipes="loadedRecipes" />
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
import RecipeSearch from "@/components/UI/RecipeSearch";

export default {
  components: {
    RecipeList,
    RecipeSearch
  },
  computed: {
    loadedRecipes() {
      return this.$store.getters.loadedRecipes;
    }
  },
  methods: {
    searchText(text) {
      if (text.length > 2) {
        this.recipes = null;
        return axios
          .get(url)
          .then(res => {
            var re = new RegExp(text, "gi");
            let arr = Object.entries(res.data).filter(a =>
              a[1].ingredients.find(b => b.ingredient.toLowerCase().match(re))
            );
            this.recipes = [arr[0][1]];
          })
          .catch(e => console.log(e));
      }
    }
  }
};
</script>
