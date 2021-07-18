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
      <RecipeList isAdmin />
    </section>
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
export default {
  components: {
    RecipeList
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
