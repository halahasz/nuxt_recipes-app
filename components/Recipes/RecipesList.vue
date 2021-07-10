<template>
  <div class="recipes-list">
    <Recipe
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.id"
      :is-admin="isAdmin"
      :photo="recipe.photo"
      :title="recipe.title"
      :author="recipe.author"
      :recipe="recipe.recipe"
      :time="recipe.time"
      :portions="recipe.portions"
      :ingredients="recipe.ingredients"
      :liked="recipe.liked"
      :date="recipe.date"
    />
  </div>
</template>

<script>
import Recipe from "@/components/Recipes/Recipe";
export default {
  name: "RecipesList",
  components: {
    Recipe
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    recipes: {
      type: Array,
      required: false
    }
  }
};
</script>
<style scoped>
.recipes-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
