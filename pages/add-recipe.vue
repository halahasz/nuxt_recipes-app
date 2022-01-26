<template>
  <div class="add-recipe-page">
    <AddRecipeForm @submit="onSubmitted" />
  </div>
</template>

<script>
import AddRecipeForm from "@/components/Section/AddRecipeForm";

export default {
  components: {
    AddRecipeForm
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
