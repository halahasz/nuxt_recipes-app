<template>
  <div class="favourites-page">
    <RecipeList :recipes="likedRecipes" />
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export default {
  components: {
    RecipeList,
    LoadingSpinner
  },
  computed: {
    likedRecipes() {
      return this.$store.getters.loadedRecipes.filter(
        recipe => recipe.liked === true
      );
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    loadLikedRecipes() {
      const arr = this.$cookies.get("likedRecipes");
      arr.forEach(id => {
        this.$store.dispatch("loadLikedRecipes", id);
      });
    }
  }
};
</script>
