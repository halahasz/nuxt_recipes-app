<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AddRecipeForm
        :recipe="loadedRecipe"
        @del-recipe="onDeleted"
        @submit="onSubmitted"
      />
    </section>
  </div>
</template>

<script>
import AddRecipeForm from "@/components/Section/AddRecipeForm";
import axios from "axios";

export default {
  layout: "admin",
  middleware: ["check-auth", "auth"],
  components: {
    AddRecipeForm
  },
  async asyncData({ store, params }) {
    const recipe = await store.dispatch("loadRecipe", params.editId);
    return {
      loadedRecipe: recipe
    };
  },
  methods: {
    onSubmitted(editedRecipe) {
      this.$store.dispatch("editRecipe", editedRecipe).then(() => {
        this.$router.push("/recipes/" + this.$route.params.editId);
      });
    },
    onDeleted(deletedRecipe) {
      this.$store.dispatch("deleteRecipe", deletedRecipe).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
