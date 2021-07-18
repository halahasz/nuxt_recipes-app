import Vuex from "vuex";
import axios from "axios";
import api from "@/api/baseConfig";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedRecipes: []
    },
    mutations: {
      setRecipes(state, recipes) {
        state.loadedRecipes = recipes;
      },
      addRecipe(state, recipe) {
        state.loadedRecipes.unshift(recipe);
      },
      editRecipe(state, editedRecipe) {
        const postIndex = state.loadedRecipes.findIndex(
          post => post.id === editedRecipe.id
        );
        state.loadedRecipes[postIndex] = editedRecipe;
      },
      editLikedRecipe(state, id, editedRecipe) {
        state.loadedRecipes[id] = editedRecipe;
      },
      deleteRecipe(state, deletedRecipe) {
        const recipeIndex = state.loadedRecipes.findIndex(
          recipe => recipe.id == deletedRecipe.id
        );
        state.loadedRecipes.splice(recipeIndex, 1);
        return state.loadedRecipes;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(api.BASE_URL + 'recipes.json?orderBy="order"&limitToFirst=6')
          .then(res => {
            const recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }
            vuexContext.commit("setRecipes", recipesArray);
          })
          .catch(e => context.error(e));
      },
      addRecipe(vuexContext, recipe) {
        const createdRecipe = {
          ...recipe
        };
        return axios
          .post(api.BASE_URL + "recipes.json", {
            ...createdRecipe
          })
          .then(result => {
            createdRecipe.id = result.data.name;
            vuexContext.commit("addRecipe", {
              ...createdRecipe
            });
          })
          .catch(e => console.log(e));
      },
      deleteRecipe(vuexContext, deletedRecipe) {
        return axios
          .delete(
            api.BASE_URL + "recipes/" + deletedRecipe.id + ".json",
            deletedRecipe
          )
          .then(result => {
            deletedRecipe.id = result.config.id;
            vuexContext.commit("deleteRecipe", deletedRecipe);
          })
          .catch(e => console.log(e));
      },
      editRecipe(vuexContext, editedRecipe) {
        return axios
          .put(
            api.BASE_URL + "recipes/" + editedRecipe.id + ".json",
            editedRecipe
          )
          .then(res => {
            vuexContext.commit("editRecipe", editedRecipe);
          })
          .catch(e => console.log(e));
      },

      setRecipes(vuexContext, recipes) {
        vuexContext.commit("setRecipes", recipes);
      }
    },
    getters: {
      loadedRecipes(state) {
        return state.loadedRecipes;
      },
      likedRecipes(state) {
        return state.loadedRecipes
          ? state.loadedRecipes.filter(a => a.liked === true)
          : [];
      }
    }
  });
};

export default createStore;
