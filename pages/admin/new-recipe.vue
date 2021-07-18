<template>
  <div class="admin-new-recipe-page">
    <section class="new-post-form">
      <RecipeForm />
    </section>
  </div>
</template>

<script>
import RecipeForm from "@/components/UI/RecipeForm";
export default {
  components: {
    RecipeForm
  }
};
</script>
