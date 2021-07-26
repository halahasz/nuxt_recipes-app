<template>
  <div class="favourites-page">
    <transition-group tag="span" name="fade-group" mode="out-in">
      <RecipeList
        key="1"
        v-if="loadedRecipes.length"
        :recipes="loadedRecipes"
      />
      <h1 key="2" class="page-title" v-else>There is no favourite recipes!</h1>
    </transition-group>
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export default {
  async asyncData({ store }) {
    const loadedRecipes = await store.dispatch("loadLikedRecipes");

    return {
      loadedRecipes: loadedRecipes
    };
  },
  components: {
    RecipeList,
    LoadingSpinner
  },
  computed: {
    // likedRecipes() {
    //   return this.loadedRecipes.filter(recipe => recipe.liked === true);
    // },
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
