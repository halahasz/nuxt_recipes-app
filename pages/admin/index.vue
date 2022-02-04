<template>
  <div class="admin-page">
    <section class="new-recipe">
      <!-- <AppAppButton @click="$router.push('/admin/new-recipe')"
        >Create recipe</AppAppButton
      >-->
      <AppButton text="Add recipe" @click="$router.push('/add-recipe')" />
      <AppButton text="Log out" color="white" @click="onLogout" />
    </section>
    <section class="existing-recipes">
      <p class="recipes-number">
        Number of recipes:
        <strong>{{ this.$store.state.loadedRecipes.length }}</strong>
      </p>
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
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    },
  },
};
</script>

<style lang="scss">
.admin-page {
  background: url("~assets/img/bg.jpg") no-repeat right;
  background-size: cover;
  height: calc(100vh - 60px);
}
.recipes-number {
  text-align: center;
  padding-top: 30vh;
  font-size: 22px;
}
</style>
