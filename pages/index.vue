<template>
  <div class="recipes-page">
    <RecipeList :recipes="loadedRecipes" />
    <button @click="loadRecipes(3)">Load</button>
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
    }
  },
  methods: {
    loadRecipes(num) {
      this.$store.dispatch("loadRecipes", num);
    }
  }
};
</script>
