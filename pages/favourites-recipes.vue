<template>
  <div class="favourites-page">
    <transition name="fade" mode="out-in">
      <RecipeList key="1" v-if="likedRecipes.length" :recipes="likedRecipes" />
      <h1 key="2" class="page-title" v-else>
        There is no favourite recipes! <br />
        Please lik some!
      </h1>
    </transition>
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
    likedRecipes() {
      return this.$store.state.likedRecipes;
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
