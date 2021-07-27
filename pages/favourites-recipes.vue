<template>
  <div class="favourites-page">
    <transition-group tag="span" name="fade-group" mode="out-in">
      <RecipeList
        key="1"
        v-if="loadedRecipes.length"
        :recipes="loadedRecipes"
      />
      <h1 key="2" class="page-title" v-else>There is no favourite recipes!</h1>
    </transition-group>
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export default {
  async asyncData({ store }) {
    await store.dispatch("loadLikedRecipes");
  },
  components: {
    RecipeList,
    LoadingSpinner
  },
  computed: {
    loadedRecipes() {
      return this.$store.state.loadedRecipes;
    }
  },
  methods: {
    loadLikedRecipes() {
      const arr = this.$cookies.get("likedRecipes");
      arr.forEach(id => {
        this.$store.dispatch("loadLikedRecipes", id);
      });
    }
  }
};
</script>
