import Vuex from "vuex";
import axios from "axios";
import api from "@/api/baseConfig";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedRecipes: [],
      recipesNum: 6,
      allRecipesLoaded: false,
      loading: false
    },
    mutations: {
      setRecipes(state, recipes) {
        state.loadedRecipes = recipes;
      },
      setLoading(state, value) {
        state.loading = value;
      },
      setAllRecipesLoaded(state, value) {
        state.allRecipesLoaded = value;
      },
      setRecipesNum(state, num) {
        state.recipesNum = num;
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
      nuxtServerInit({ commit, state }) {
        return axios
          .get(
            process.env.baseUrl +
              `recipes.json?orderBy="order"&limitToFirst=${state.recipesNum}`
          )
          .then(res => {
            const recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }
            commit("setRecipes", recipesArray);
          })
          .catch(e => console.log(e));
      },
      loadRecipes({ commit, state }, num) {
        commit("setLoading", true);
        const recipesNum = state.recipesNum + num;
        return axios
          .get(
            process.env.baseUrl +
              `recipes.json?orderBy="order"&limitToFirst=${recipesNum}`
          )
          .then(res => {
            const arr = Object.entries(res.data);
            console.log(arr.length, state.loadedRecipes.length);
            if (arr.length === state.loadedRecipes.length) {
              commit("setAllRecipesLoaded", true);
            }
            const recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }
            const sorted = recipesArray.sort((a, b) => a.order - b.order);
            commit("setRecipesNum", recipesNum);
            commit("setRecipes", sorted);
            commit("setLoading", false);
          })
          .catch(e => console.log(e));
      },
      loadLikedRecipes({ commit, state }, id) {
        return axios
          .get(process.env.baseUrl + `recipes.json?orderBy="id"&equalTo=${id}`)
          .then(res => {
            const recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }
            const sorted = recipesArray.sort((a, b) => a.order - b.order);
            commit("setRecipes", sorted);
          })
          .catch(e => console.log(e));
      },
      addRecipe({ commit }, recipe) {
        const createdRecipe = {
          ...recipe
        };
        return axios
          .post(process.env.baseUrl + "recipes.json", {
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
            process.env.baseUrl + "recipes/" + deletedRecipe.id + ".json",
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
            process.env.baseUrl + "recipes/" + editedRecipe.id + ".json",
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
            return axios
              .get(
                process.env.baseUrl +
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
            .get(
              process.env.baseUrl +
                'recipes.json?orderBy="order"&limitToFirst=6'
            )
            .then(res => {
              const recipesArray = [];
              for (const key in res.data) {
                recipesArray.unshift({ ...res.data[key], id: key });
              }
              commit("setRecipes", recipesArray);
            })
            .catch(e => console.log(e));
        }
      },
      signUp({ commit }, payload) {
        return axios
          .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`,
            payload
          )
          .then(res => console.log(res))
          .catch(err => console.log(err));
      },
      signIn({ commit }, payload) {
        return axios
          .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`,
            payload
          )
          .then(res => console.log(res))
          .catch(err => console.log(err));
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
