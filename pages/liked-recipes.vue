<template>
  <div class="liked-page">
    <transition name="fade" mode="out-in">
      <RecipesList
        key="1"
        v-if="likedRecipes.length"
        :recipes="unlikeClicked ? likedRecipes : initRecipes"
      />
      <h1 key="2" class="page-title" v-else>
        There is no favourite recipes! <br />
        Please like some!
      </h1>
    </transition>
  </div>
</template>

<script>
import RecipesList from "@/components/Section/RecipesList";
import { mapState } from "vuex";

export default {
  async asyncData({ store }) {
    const likedRecipes = await store.dispatch("loadLikedRecipes");
    return {
      initRecipes: likedRecipes
    };
  },
  components: {
    RecipesList
  },
  computed: {
    ...mapState(["unlikeClicked", "likedRecipes"])
  }
};
</script>
