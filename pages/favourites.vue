<template>
  <div class="favourites-page">
    <RecipeList :recipes="likedRecipes" />
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";

export default {
  components: {
    RecipeList
  },
  computed: {
    likedRecipes() {
      return this.$store.getters.loadedRecipes.filter(
        recipe => recipe.liked === true
      );
    }
  }
};
</script>

<style lang="scss">
.favourites-page {
  position: relative;
  margin-bottom: 100px;
  margin-top: 35px;
}
</style>
