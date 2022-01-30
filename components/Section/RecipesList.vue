<template>
  <div class="recipes-list">
    <transition-group tag="div" name="fade-group">
      <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
        <Recipe :recipe="recipe" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Recipe from "@/components/UI/Recipe";

export default {
  name: "RecipesList",
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

<style lang="scss">
@import "@/assets/styles/_variables";
.recipes-list div {
  display: flex;
  flex-wrap: wrap;
  transition: $transition;
}
</style>
