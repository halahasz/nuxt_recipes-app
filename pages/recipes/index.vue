<template>
  <div class="recipes-page">
    <h1>Last recipe</h1>
    <RecipesList :recipes="loadedRecipes" />
  </div>
</template>

<script>
import RecipesList from "@/components/RecipesList";

export default {
  components: {
    RecipesList
  },
  computed: {
    loadedRecipes() {
      return this.$store.getters.loadedRecipes;
    }
  }
};
</script>
