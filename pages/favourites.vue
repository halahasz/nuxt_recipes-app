<template>
  <div class="favourites-page">
    <RecipesList :recipes="likedRecipes" />
  </div>
</template>

<script>
import RecipesList from "@/components/RecipesList";
import { mapGetters } from "vuex";

export default {
  components: {
    RecipesList
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
  max-width: 80%;
  margin-left: 10%;
  position: relative;
  margin-bottom: 100px;
  margin-top: 35px;
}
</style>
