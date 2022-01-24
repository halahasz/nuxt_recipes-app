<template>
  <div class="liked-page">
    <transition name="fade" mode="out-in">
      <RecipeList
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
import RecipeList from "@/components/UI/RecipeList";
import { mapState } from "vuex";

export default {
  async asyncData({ store }) {
    const likedRecipes = await store.dispatch("loadLikedRecipes");
    return {
      initRecipes: likedRecipes
    };
  },
  components: {
    RecipeList
  },
  computed: {
    ...mapState(["unlikeClicked", "likedRecipes"])
  }
};
</script>
