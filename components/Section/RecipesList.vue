<template>
  <div class="recipes-list">
    <transition-group tag="div" name="recipes-list">
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
    Recipe,
  },
  props: {
    recipes: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
.recipes-list > div {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  transition: $transition;
}
</style>
