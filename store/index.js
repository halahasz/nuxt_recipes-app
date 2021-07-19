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
      nuxtServerInit({ commit }) {
        return axios
          .get(api.BASE_URL + 'recipes.json?orderBy="order"&limitToFirst=6')
          .then(res => {
            const recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }
            commit("setRecipes", recipesArray);
          })
          .catch(e => console.log(e));
      },
      addRecipe({ commit }, recipe) {
        const createdRecipe = {
          ...recipe
        };
        return axios
          .post(api.BASE_URL + "recipes.json", {
            ...createdRecipe
          })
          .then(result => {
            createdRecipe.id = result.data.name;
            commit("addRecipe", {
              ...createdRecipe
            });
          })
          .catch(e => console.log(e));
      },
      deleteRecipe({ commit }, deletedRecipe) {
        return axios
          .delete(
            api.BASE_URL + "recipes/" + deletedRecipe.id + ".json",
            deletedRecipe
          )
          .then(result => {
            deletedRecipe.id = result.config.id;
            commit("deleteRecipe", deletedRecipe);
          })
          .catch(e => console.log(e));
      },
      editRecipe({ commit }, editedRecipe) {
        return axios
          .put(
            api.BASE_URL + "recipes/" + editedRecipe.id + ".json",
            editedRecipe
          )
          .then(res => {
            commit("editRecipe", editedRecipe);
          })
          .catch(e => console.log(e));
      },

      setRecipes({ commit }, recipes) {
        commit("setRecipes", recipes);
      },
      searchRecipes({ commit }, text) {
        if (text.length) {
          const recipesArray = [];
          for (let i = 0; i < 10; i++) {
            axios
              .get(
                api.BASE_URL +
                  `recipes.json?orderBy="ingredients/${i}/ingredient"&equalTo="${text}"`
              )
              .then(res => {
                for (const key in res.data) {
                  recipesArray.unshift({ ...res.data[key], id: key });
                }
              });
          }
          commit("setRecipes", recipesArray);
        } else {
          return axios
            .get(api.BASE_URL + 'recipes.json?orderBy="order"&limitToFirst=6')
            .then(res => {
              const recipesArray = [];
              for (const key in res.data) {
                recipesArray.unshift({ ...res.data[key], id: key });
              }
              commit("setRecipes", recipesArray);
            })
            .catch(e => console.log(e));
        }
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
