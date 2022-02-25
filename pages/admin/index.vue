<template>
  <div class="admin-page">
    <section class="admin-page__buttons">
      <AppButton text="Add recipe" @click="$router.push('/add-recipe')" />
      <AppButton text="Log out" color="white" @click="onLogout" />
    </section>
    <section>
      <!-- <p class="recipes-number">
        Number of recipes:
        <strong>{{ this.$store.state.loadedRecipes.length }}</strong>
      </p> -->
      <RecipesList isAdmin />
    </section>
  </div>
</template>

<script>
import RecipesList from "@/components/Section/RecipesList";
import AppButton from "@/components/UI/AppButton";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    RecipesList,
    AppButton,
  },
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$store.dispatch("snackbar/setSnackbar", {
          text: "Successfully logged out",
          error: false,
        });
      });
      this.$router.push("/admin/auth");
    },
  },
};
</script>
