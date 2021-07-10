import Vuex from "vuex";
import axios from "axios";

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
          .get("https://recipes-6f5e0.firebaseio.com/recipes.json")
          .then(res => {
            const recipesArray = [];
            let index = 0;
            for (const key in res.data) {
              if (index < 6) {
                recipesArray.unshift({ ...res.data[key], id: key });
              }
              index++;
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
          .post("https://recipes-6f5e0.firebaseio.com/recipes.json", {
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
            "https://recipes-6f5e0.firebaseio.com/recipes/" +
              deletedRecipe.id +
              ".json",
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
            "https://recipes-6f5e0.firebaseio.com/recipes/" +
              editedRecipe.id +
              ".json",
            editedRecipe
          )
          .then(res => {
            vuexContext.commit("editRecipe", editedRecipe);
          })
          .catch(e => console.log(e));
      },

      setRecipes(vuexContext, posts) {
        vuexContext.commit("setRecipes", posts);
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
