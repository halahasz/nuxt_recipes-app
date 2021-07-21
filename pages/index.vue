<template>
  <div class="recipes-page">
    <RecipeList :recipes="loadedRecipes" />
    <button class="btn-load" v-if="!allRecipesLoaded" @click="loadRecipes(3)">
      Load more recipes
    </button>
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";

export default {
  components: {
    RecipeList
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
    }
  },
  methods: {
    loadRecipes(num) {
      this.$store.dispatch("loadRecipes", num);
    }
  }
};
</script>
