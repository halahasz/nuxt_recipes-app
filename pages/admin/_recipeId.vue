<template>
  <div class="admin-recipe-page">
    <section class="update-form">
      <RecipeForm isAdmin="true" :recipe="loadedRecipe" />
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
  props: {
    recipe: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      loadedRecipe: {
        title: "My recipe",
        author: "Halina",
        photo: "https://source.unsplash.com/random"
      }
    };
  }
};
</script>
