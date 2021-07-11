<template>
  <div class="admin-recipe-page">
    <section class="update-form">
      <AdminPostForm isAdmin="true" :recipe="loadedRecipe" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/AdminPostForm";
export default {
  components: {
    AdminPostForm
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