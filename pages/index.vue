<template>
  <div class="recipes-page">
    <RecipeList :recipes="loadedRecipes" />
    <transition-group tag="span" name="fade-group" mode="out-in">
      <LoadingSpinner key="1" v-if="loading" />
      <Button
        key="2"
        text="Load more"
        center
        v-if="!allRecipesLoaded && !loading"
        @click="loadRecipes(3)"
      />
    </transition-group>
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import Button from "@/components/UI/Button";

export default {
  async asyncData({ store }) {
    const loadedRecipes = await store.dispatch("loadRecipes", 0);

    return {
      loadedRecipes: loadedRecipes
    };
  },
  components: {
    RecipeList,
    LoadingSpinner,
    Button
  },
  computed: {
    allRecipesLoaded() {
      return this.$store.state.allRecipesLoaded;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    loadRecipes(num) {
      this.$store
        .dispatch("loadRecipes", num)
        .then(res => (this.loadedRecipes = res));
    }
  }
};
</script>
