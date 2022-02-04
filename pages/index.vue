<template>
  <div class="recipes-page">
    <transition-group tag="span" name="fade-group" mode="out-in">
      <RecipesList
        key="1"
        v-if="loadedRecipes.length"
        :recipes="loadedRecipes"
      />
      <h1 key="2" class="page-title" v-else>There is no recipes!</h1>
    </transition-group>
    <transition-group tag="span" name="fade-group" mode="out-in">
      <LoadingSpinner key="1" v-if="loading" />
      <AppButton
        key="2"
        class="absolute"
        text="Load more"
        center
        v-if="showButton"
        @click="loadRecipes(3)"
      />
    </transition-group>
  </div>
</template>

<script>
import RecipesList from "@/components/Section/RecipesList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import AppButton from "@/components/UI/AppButton";
import { mapState } from "vuex";

export default {
  async asyncData({ store }) {
    await store.dispatch("loadRecipes", 0);
  },
  components: {
    RecipesList,
    LoadingSpinner,
    AppButton,
  },
  computed: {
    ...mapState(["loadedRecipes", "isAllRecipesLoaded", "loading"]),
    showButton() {
      return !this.loading && !this.isAllRecipesLoaded;
    },
  },
  methods: {
    loadRecipes(num) {
      this.$store.dispatch("loadRecipes", num);
    },
  },
};
</script>
