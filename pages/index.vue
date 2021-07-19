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
    loadedRecipes: {
      get() {
        return this.$store.getters.loadedRecipes;
      },
      set(value) {
        this.$store.commit("setRecipes", value);
      }
    }
  },
  methods: {
    searchText(text) {
      if (text.length > 2) {
        this.$store.dispatch("searchRecipes", text.toLowerCase());
      }
    }
  }
};
</script>
