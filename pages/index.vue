<template>
  <div class="recipes-page">
    <transition-group tag="span" name="fade-group" mode="out-in">
      <RecipeList
        key="1"
        v-if="loadedRecipes.length"
        :recipes="loadedRecipes"
      />
      <h1 key="2" class="page-title" v-else>
        There is no recipes!
      </h1>
    </transition-group>
    <transition-group tag="span" name="fade-group" mode="out-in">
      <LoadingSpinner key="1" v-if="loading" />
      <Button
        key="2"
        class="btn-absolute"
        text="Load more"
        center
        v-if="showButton"
        @click="loadRecipes(3)"
      />
    </transition-group>
  </div>
</template>

<script>
import RecipeList from "@/components/UI/RecipeList";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import Button from "@/components/UI/Button";
import { mapState } from "vuex";

export default {
  async asyncData({ store }) {
    if (store.state.searchText === "") {
      const loadedRecipes = await store.dispatch("loadRecipes", 0);

      return {
        loadedRecipes: loadedRecipes
      };
    } else {
      await store.dispatch("searchRecipes", store.state.searchText);

      return {
        loadedRecipes: store.state.loadedRecipes
      };
    }
  },
  components: {
    RecipeList,
    LoadingSpinner,
    Button
  },
  computed: {
    ...mapState({
      allRecipesLoaded: state => state.allRecipesLoaded,
      loading: state => state.loading,
      searchText: state => state.searchText
    }),
    showButton() {
      return this.searchText === "" && !this.loading && !this.allRecipesLoaded;
    }
  },
  methods: {
    loadRecipes(num) {
      this.$store
        .dispatch("loadRecipes", num)
        .then(res => (this.loadedRecipes = res));
    }
  }
};
</script>
