<template>
  <div class="recipes-page">
    <transition-group tag="span" name="fade-group" mode="out-in">
      <div v-if="searchedRecipes.length" key="1">
        <transition name="fade-search-title">
          <h1 class="page-title" :key="$route.query.ingredient">
            Search results for: <span>{{ $route.query.ingredient }}</span>
          </h1>
        </transition>
        <LoadingSpinner key="1" v-if="loading" />
        <RecipesList :recipes="searchedRecipes" v-else />
      </div>
      <h1 key="2" class="page-title" v-else>
        No recipes found!
      </h1>
    </transition-group>
  </div>
</template>

<script>
import RecipesList from "@/components/Section/RecipesList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import Button from "@/components/UI/Button";
import { mapState } from "vuex";

export default {
  async asyncData({ store, route }) {
    await store.dispatch("searchRecipes", route.query.ingredient);
  },
  components: {
    RecipesList,
    LoadingSpinner,
    Button
  },
  computed: {
    ...mapState(["searchedRecipes", "searchText", "loading"])
  }
};
</script>
