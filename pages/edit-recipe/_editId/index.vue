<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm
        :recipe="loadedRecipe"
        @del-recipe="onDeleted"
        @del-ingr="onIngrDeleted"
        @submit="onSubmitted"
      />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios
      .get(
        "https://recipes-6f5e0.firebaseio.com/recipes/" +
          context.params.editId +
          ".json"
      )
      .then(res => {
        return {
          loadedRecipe: { ...res.data, id: context.params.editId }
        };
      })
      .catch(e => context.error());
  },
  methods: {
    onSubmitted(editedRecipe) {
      this.$store.dispatch("editRecipe", editedRecipe).then(() => {
        this.$router.push("/recipes/" + this.$route.params.editId);
      });
    },
    onIngrDeleted(rmIngr) {
      axios
        .delete(
          "https://recipes-6f5e0..firebaseio.com/recipes/" +
            this.$route.params.editId +
            "/ingredients/" +
            rmIngr +
            "ingredient.json"
        )
        .then(() => {})
        .catch(e => alert(e));
    },
    onDeleted(deletedRecipe) {
      this.$store.dispatch("deleteRecipe", deletedRecipe).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
