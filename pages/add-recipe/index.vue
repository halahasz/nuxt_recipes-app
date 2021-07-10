<template>
  <div class="admin-new-recipe-page">
    <section class="new-post-form">
      <AdminPostForm isAdmin @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  components: {
    AdminPostForm
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
