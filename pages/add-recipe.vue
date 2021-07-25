<template>
  <div class="add-recipe-page">
    <section class="new-post-form">
      <RecipeForm v-if="isAdmin" @submit="onSubmitted" />
      <h1 class="page-title" v-else>Please log in to add a recepe!</h1>
    </section>
  </div>
</template>

<script>
import RecipeForm from "@/components/UI/RecipeForm";
export default {
  middleware: ["check-auth", "auth"],
  components: {
    RecipeForm
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
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
