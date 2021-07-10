<template>
  <div class="admin-page">
    <section class="new-recipe">
      <!-- <AppButton @click="$router.push('/admin/new-recipe')"
        >Create recipe</AppButton
      >-->
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
import RecipesList from "@/components/Recipes/RecipesList";
export default {
  components: {
    RecipesList
  }
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
