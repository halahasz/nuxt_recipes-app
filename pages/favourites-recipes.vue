<template>
  <div class="favourites-page">
    <RecipeList :recipes="likedRecipes" />
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export default {
  async asyncData({ store }) {
    const loadedRecipes = await store.dispatch("loadRecipes", 0);

    return {
      loadedRecipes: loadedRecipes
    };
  },
  components: {
    RecipeList,
    LoadingSpinner
  },
  computed: {
    likedRecipes() {
      return this.loadedRecipes.filter(recipe => recipe.liked === true);
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
