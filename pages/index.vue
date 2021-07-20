<template>
  <div class="recipes-page">
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
    loadedRecipes: {
      get() {
        return this.$store.getters.loadedRecipes;
      },
      set(value) {
        this.$store.commit("setRecipes", value);
      }
    }
  }
  // methods: {
  //   searchText(text) {
  //     this.$store.dispatch("searchRecipes", text.toLowerCase());
  //   }
  // }
};
</script>
