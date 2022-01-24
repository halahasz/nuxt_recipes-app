<template>
  <div class="recipes-list">
    <Recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>

<script>
import Recipe from "@/components/UI/Recipe";
export default {
  name: "RecipeList",
  components: {
    Recipe
  },
  props: {
    recipes: {
      type: Array,
      required: false
    }
  }
};
</script>

<style scoped>
.recipes-list {
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
</style>
