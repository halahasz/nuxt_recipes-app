import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedRecipes: [],
      likedRecipes: [],
      searchedRecipes: [],
      recipesNum: 6,
      isAllRecipesLoaded: false,
      searchText: "",
      snackbarMessage: "",
      snackbarError: false,
      showSnackbar: false,
      loading: false,
      token: null,
      email: null,
      password: null
    },
    mutations: {
      setRecipes(state, recipes) {
        state.loadedRecipes = recipes;
      },
      setLikedRecipes(state, recipes) {
        state.likedRecipes = recipes;
      },
      setSearchedRecipes(state, recipes) {
        state.searchedRecipes = recipes;
      },
      setLoading(state, value) {
        state.loading = value;
      },
      setShowSnackbar(state, value) {
        state.showSnackbar = value;
      },
      setSnackbarError(state, value) {
        state.snackbarError = value;
      },
      setSnackbarMessage(state, value) {
        state.snackbarMessage = value;
      },
      setAllRecipesLoaded(state, value) {
        state.isAllRecipesLoaded = value;
      },
      setRecipesNum(state, num) {
        state.recipesNum = num;
      },
      setAddedRecipe(state, recipe) {
        state.loadedRecipes.unshift(recipe);
      },
      setEditedRecipe(state, editedRecipe) {
        const recipeIndex = state.loadedRecipes.findIndex(
          recipe => recipe.id === editedRecipe.id
        );
        state.loadedRecipes[recipeIndex] = editedRecipe;
      },
      setDeletedRecipe(state, deletedRecipe) {
        const recipeIndex = state.loadedRecipes.findIndex(
          recipe => recipe.id == deletedRecipe.id
        );
        let newArr = state.loadedRecipes.splice(recipeIndex, 1);
        state.loadedRecipes = newArr;
      },
      setSearchText(state, text) {
        state.searchText = text;
      },
      setToken(state, token) {
        state.token = token;
      },
      setEmail(state, email) {
        state.email = email;
      },
      setPassword(state, password) {
        state.password = password;
      },
      clearToken(state) {
        state.token = null;
      },
      clearRecipes(state) {
        state.searchedRecipes = [];
      }
    },
    actions: {
      loadRecipes({ commit, state }, num) {
        commit("setLoading", true);
        const recipesNum = state.recipesNum + num;
        return axios
          .get(
            process.env.baseUrl +
              `recipes.json?orderBy="order"&limitToFirst=${recipesNum}`
          )
          .then(res => {
            var arr = Object.entries(res.data);
            if (
              arr.length + num >= state.loadedRecipes.length &&
              arr.length % num !== 0 &&
              arr.length != state.recipesNum
            ) {
              commit("setAllRecipesLoaded", true);
            }
            var recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }
            const sortedArr = recipesArray.sort((a, b) => a.order - b.order);
            commit("setRecipesNum", recipesNum);
            commit("setRecipes", sortedArr);
            commit("setLoading", false);
            return sortedArr;
          })
          .catch(e => {
            commit("setShowSnackbar", false);
            console.log(e);
            commit("setSnackbarMessage", "There was a problem loading recipes");
            commit("setSnackbarError", true);
            commit("setShowSnackbar", true);
          });
      },
      async searchRecipes({ commit }, text) {
        if (text.length) {
          commit("setLoading", true);
          try {
            let arr = [];
            for (let i = 0; i < 12; i++) {
              let res = await axios.get(
                process.env.baseUrl +
                  `recipes.json?orderBy="ingredients/${i}/ingredient"&equalTo="${text}"`
              );
              for (const key in res.data) {
                arr.push({
                  ...res.data[key],
                  id: key
                });
              }
            }
            commit("setSearchedRecipes", arr);
            commit("setLoading", false);
          } catch (e) {
            console.log(e);
            commit("setShowSnackbar", false);
            commit(
              "setSnackbarMessage",
              "There is a problem with searching recipes"
            );
            commit("setSnackbarError", true);
            commit("setShowSnackbar", true);
          }
        } else {
          commit("clearRecipes");
        }
      },
      loadLikedRecipes({ commit, state }) {
        return axios
          .get(
            process.env.baseUrl + `recipes.json?orderBy="liked"&equalTo=true`
          )
          .then(res => {
            const recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }
            const sortedArr = recipesArray.sort((a, b) => a.order - b.order);
            commit("setLikedRecipes", sortedArr);
            return sortedArr;
          })
          .catch(e => {
            console.log(e);
            commit("setShowSnackbar", false);
            commit(
              "setSnackbarMessage",
              "There was a problem loading the liked recipes"
            );
            commit("setSnackbarError", true);
            commit("setShowSnackbar", true);
          });
      },
      editRecipe({ commit }, editedRecipe) {
        commit("setEditedRecipe", editedRecipe);
        return axios
          .put(
            process.env.baseUrl + "recipes/" + editedRecipe.id + ".json",
            editedRecipe
          )
          .then(() => {
            commit("setShowSnackbar", false);
            commit("setSnackbarMessage", "The recipe has been updated");
            commit("setSnackbarError", false);
            commit("setShowSnackbar", true);
          })
          .catch(e => {
            console.log(e);
            commit("setShowSnackbar", false);
            commit(
              "setSnackbarMessage",
              "There was a problem updating the recipe"
            );
            commit("setSnackbarError", true);
            commit("setShowSnackbar", true);
          });
      },
      filterRecipes({ commit, state }, id) {
        const filteredRecipes = state.likedRecipes.filter(el => el.id != id);
        commit("setLikedRecipes", filteredRecipes);
      },
      loadRecipe({ commit }, id) {
        return axios
          .get(process.env.baseUrl + `recipes/${id}.json`)
          .then(res => {
            return { ...res.data };
          })
          .catch(e => {
            console.log(e);
            commit("setShowSnackbar", false);
            commit(
              "setSnackbarMessage",
              "There was a problem loading the recipe"
            );
            commit("setSnackbarError", true);
            commit("setShowSnackbar", true);
          });
      },
      addRecipe({ commit }, recipe) {
        const createdRecipe = {
          ...recipe
        };
        return axios
          .post(process.env.baseUrl + "recipes.json", {
            ...recipe
          })
          .then(result => {
            createdRecipe.id = result.data.name;
            commit("setAddedRecipe", {
              ...createdRecipe
            });
            commit("setShowSnackbar", false);
            commit(
              "setSnackbarMessage",
              "There recipe has been successfully added"
            );
            commit("setSnackbarError", false);
            commit("setShowSnackbar", true);
          })
          .catch(e => {
            console.log(e);
            commit("setShowSnackbar", false);
            commit(
              "setSnackbarMessage",
              "There was a problem adding the recipe"
            );
            commit("setSnackbarError", true);
            commit("setShowSnackbar", true);
          });
      },
      deleteRecipe({ commit }, deletedRecipe) {
        return axios
          .delete(
            process.env.baseUrl + "recipes/" + deletedRecipe.id + ".json",
            deletedRecipe
          )
          .then(result => {
            deletedRecipe.id = result.config.id;
            commit("setShowSnackbar", false);
            commit("setDeletedRecipe", deletedRecipe);
            commit(
              "setSnackbarMessage",
              "There recipe has been successfully deleted"
            );
            commit("setSnackbarError", false);
            commit("setShowSnackbar", true);
          })
          .catch(e => {
            console.log(e);
            commit("setShowSnackbar", false);
            commit(
              "setSnackbarMessage",
              "There was a problem deleting the recipe"
            );
            commit("setSnackbarError", true);
            commit("setShowSnackbar", true);
          });
      },
      authenticateUser({ commit }, authData) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
        if (!authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
        }
        return axios
          .post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            commit("setToken", res.data.idToken);
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem(
              "expirationDate",
              new Date().getTime() + +res.data.expiresIn * 1000
            );
            this.$cookies.set("token", res.data.idToken);
            this.$cookies.set("refreshToken", res.data.refreshToken);
            this.$cookies.set(
              "expirationDate",
              new Date().getTime() + +res.data.expiresIn * 1000
            );
            this.$cookies.remove("likedRecipes");
          });
      },
      refreshToken({ commit, state }) {
        return axios
          .post(
            `https://securetoken.googleapis.com/v1/token?key=${
              process.env.fbAPIKey
            }&grant_type=refresh_token&refresh_token=${this.$cookies.get(
              "refreshToken"
            )}`
          )
          .then(res => {
            commit("setToken", res.data.id_token);
            localStorage.setItem("token", res.data.id_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
            localStorage.setItem(
              "expirationDate",
              new Date().getTime() + +res.data.expires_in * 1000
            );
            this.$cookies.set("token", res.data.id_token);
            this.$cookies.set("refreshToken", res.data.refresh_token);
            this.$cookies.set(
              "expirationDate",
              new Date().getTime() + +res.data.expires_in * 1000
            );
          });
      },
      initAuth({ commit, dispatch, state }, req) {
        let token, expirationDate;
        if (req) {
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("token="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("expirationDate");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          dispatch("logout");
          return;
        }

        commit("setToken", token);
      },
      logout({ commit }) {
        commit("clearToken");
        this.$cookies.remove("token");
        this.$cookies.remove("refreshToken");
        this.$cookies.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("expirationDate");
        }
      }
    },
    getters: {
      // loadedRecipes(state) {
      //   return state.loadedRecipes;
      // },
      // likedRecipes(state) {
      //   return state.loadedRecipes
      //     ? state.loadedRecipes.filter(a => a.liked === true)
      //     : [];
      // },
      isAdmin(state) {
        // return state.token != null;
        return false;
      }
    }
  });
};

export default createStore;
