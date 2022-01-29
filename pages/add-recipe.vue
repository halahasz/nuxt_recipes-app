<template>
  <div class="add-recipe-page">
    <RecipeForm @submit="onSubmitted" />
  </div>
</template>

<script>
import RecipeForm from "@/components/Section/RecipeForm";

export default {
  components: {
    RecipeForm
  },
  methods: {
    onSubmitted(recipeData) {
      this.$store.dispatch("addRecipe", recipeData).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
