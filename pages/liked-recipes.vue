<template>
  <div class="liked-page">
    <transition name="fade" mode="out-in">
      <RecipesList key="1" v-if="likedRecipes.length" :recipes="likedRecipes" />
      <h1 key="2" class="page-title" v-else>
        There is no favourite recipes! <br />
        Please like some!
      </h1>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RecipesList from "@/components/Section/RecipesList";

export default {
  async asyncData({ store }) {
    await store.dispatch("loadLikedRecipes");
  },
  components: {
    RecipesList
  },
  computed: {
    ...mapState(["likedRecipes"])
  }
};
</script>
