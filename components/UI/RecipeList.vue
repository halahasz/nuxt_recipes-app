<template>
  <div class="recipes-list">
    <Recipe
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.id"
      :photo="recipe.photo"
      :title="recipe.title"
      :author="recipe.author"
      :recipe="recipe.recipe"
      :keywards="recipe.keywards"
      :time="recipe.time"
      :portions="recipe.portions"
      :ingredients="recipe.ingredients"
      :liked="recipe.liked"
      :order="recipe.order"
      :date="recipe.date"
    />
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
