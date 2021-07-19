<template>
  <div class="admin-new-recipe-page">
    <section class="new-post-form">
      <RecipeForm isAdmin @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import RecipeForm from "@/components/UI/RecipeForm";
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
