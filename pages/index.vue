<template>
  <div class="recipes-page">
    <RecipeList :recipes="loadedRecipes" />
    <transition-group tag="span" name="fade-group" mode="out-in">
      <LoadingSpinner key="1" v-if="loading" />
      <button
        key="2"
        class="btn-load"
        v-if="!allRecipesLoaded && !loading"
        @click="loadRecipes(3)"
      >
        Load more
      </button>
    </transition-group>
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
    loadedRecipes: {
      get() {
        return this.$store.getters.loadedRecipes;
      },
      set(value) {
        this.$store.commit("setRecipes", value);
      }
    },
    allRecipesLoaded() {
      return this.$store.state.allRecipesLoaded;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    loadRecipes(num) {
      this.$store.dispatch("loadRecipes", num);
    }
  }
};
</script>
