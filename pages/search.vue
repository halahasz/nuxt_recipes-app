<template>
  <div class="search-page">
    <transition-group tag="span" name="switch-group" mode="out-in">
      <div v-if="searchedRecipes.length" key="1">
        <transition name="fade-search-title">
          <h1 class="page-title" :key="$route.query.ingredient">
            Search results for: <span>{{ $route.query.ingredient }}</span>
          </h1>
        </transition>
        <LoadingSpinner key="1" v-if="loading" />
        <RecipesList :recipes="searchedRecipes" v-else />
      </div>
      <h1 key="2" class="page-title" v-else>No recipes found!</h1>
    </transition-group>
  </div>
</template>

<script>
import RecipesList from "@/components/Section/RecipesList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import AppButton from "@/components/UI/AppButton";
import { mapState } from "vuex";

export default {
  async asyncData({ store, route }) {
    await store.dispatch("searchRecipes", route.query.ingredient);
  },
  components: {
    RecipesList,
    LoadingSpinner,
    AppButton,
  },
  computed: {
    ...mapState(["searchedRecipes", "searchText", "loading"]),
  },
  beforeDestroy() {
    this.$store.commit("setSearchText", "");
  },
};
</script>
