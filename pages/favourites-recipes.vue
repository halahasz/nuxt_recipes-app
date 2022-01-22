<template>
  <div class="favourites-page">
    <transition name="fade" mode="out-in">
      <RecipeList
        key="1"
        v-if="likedRecipes.length || (loadedRecipes.length && isLogged)"
        :recipes="isLogged ? loadedRecipes : likedRecipes"
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
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { mapState, mapGetters } from "vuex";

export default {
  async asyncData({ store }) {
    await store.dispatch("loadLikedRecipes");
  },
  components: {
    RecipeList,
    LoadingSpinner
  },
  computed: {
    ...mapState(["likedRecipes", "loadedRecipes", "token"]),
    isLogged() {
      return this.$cookies.get("token");
    }
  },
  mounted() {
    this.loadLikedRecipes();
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
