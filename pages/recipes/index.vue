<template>
  <div class="recipes-page">
    <h1>Last recipe</h1>
    <RecipeList :recipes="loadedRecipes" />
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";

export default {
  components: {
    RecipeList
  },
  computed: {
    loadedRecipes() {
      return this.$store.getters.loadedRecipes;
    }
  }
};
</script>
