import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedRecipes: [],
      likedRecipes: [],
      recipesNum: 6,
      isRecipesLoaded: false,
      loading: false,
      token: null,
      email: null,
      password: null,
      searchText: ""
    },
    mutations: {
      setRecipes(state, recipes) {
        state.loadedRecipes = recipes;
      },
      setLikedRecipes(state, recipes) {
        state.likedRecipes = recipes;
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
      deleteRecipe(state, deletedRecipe) {
        const recipeIndex = state.loadedRecipes.findIndex(
          recipe => recipe.id == deletedRecipe.id
        );
        state.loadedRecipes.splice(recipeIndex, 1);
        return state.loadedRecipes;
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
        state.loadedRecipes = [];
      },
      setSearchText(state, text) {
        state.searchText = text;
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

            if (!this.$cookies.get("token")) {
              const arr = this.$cookies.get("likedRecipes");
              if (arr) {
                recipesArray.map(el =>
                  arr.includes(el.id) ? (el.liked = true) : (el.liked = false)
                );
              } else {
                recipesArray.map(el => (el.liked = false));
              }
              const sortedArr = recipesArray.sort((a, b) => a.order - b.order);
              commit("setRecipesNum", recipesNum);
              commit("setRecipes", sortedArr);
              commit("setLoading", false);
              return sortedArr;
            }
            const sortedArr = recipesArray.sort((a, b) => a.order - b.order);
            commit("setRecipesNum", recipesNum);
            commit("setRecipes", sortedArr);
            commit("setLoading", false);
            return sortedArr;
          })
          .catch(e => console.log(e));
      },
      filterRecipes({ commit, state }, id) {
        const filteredRecipes = state.likedRecipes.filter(el => el.id != id);
        commit("setLikedRecipes", filteredRecipes);
      },
      loadRecipe({ commit, state }, id) {
        return axios
          .get(process.env.baseUrl + `recipes/${id}.json`)
          .then(res => {
            if (!this.$cookies.get("token")) {
              const arr = this.$cookies.get("likedRecipes");
              if (arr) {
                arr.includes(id)
                  ? (res.data.liked = true)
                  : (res.data.liked = false);
              } else {
                res.data.liked = false;
              }
            }
            return { ...res.data, id: id };
          })
          .catch(e => console.log(e));
      },
      async loadLikedRecipes({ commit, state }) {
        if (!this.$cookies.get("token")) {
          let arr = this.$cookies.get("likedRecipes");
          if (arr) {
            var recipesArray = [];
            for (let key of arr) {
              let res = await axios.get(
                process.env.baseUrl + `recipes/${key}.json`
              );
              res.data.liked = true;
              recipesArray.unshift({ ...res.data });
            }
            const sortedArr = recipesArray.sort((a, b) => a.order - b.order);
            commit("setLikedRecipes", sortedArr);
            return state.loadedRecipes;
          } else {
            commit("setLikedRecipes", []);
            return [];
          }
        } else {
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
              commit("setRecipes", sortedArr);
              return state.loadedRecipes;
            })
            .catch(e => console.log(e));
        }
      },
      addRecipe({ commit, state }, recipe) {
        const createdRecipe = {
          ...recipe
        };
        return axios
          .post(
            process.env.baseUrl +
              "recipes.json?auth=" +
              this.$cookies.get("token"),
            {
              ...createdRecipe
            }
          )
          .then(result => {
            createdRecipe.id = result.data.name;
            commit("addRecipe", {
              ...createdRecipe
            });
          })
          .catch(e => console.log(e));
      },
      deleteRecipe({ commit, state }, deletedRecipe) {
        return axios
          .delete(
            process.env.baseUrl +
              "recipes/" +
              deletedRecipe.id +
              ".json?auth=" +
              this.$cookies.get("token"),
            deletedRecipe
          )
          .then(result => {
            deletedRecipe.id = result.config.id;
            commit("deleteRecipe", deletedRecipe);
          })
          .catch(e => console.log(e));
      },
      editRecipe({ commit, state }, editedRecipe) {
        return axios
          .put(
            process.env.baseUrl +
              "recipes/" +
              editedRecipe.id +
              ".json?auth=" +
              this.$cookies.get("token"),
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
      searchRecipes({ commit, dispatch }, text) {
        if (text.length) {
          commit("clearRecipes");
          for (let i = 0; i < 12; i++) {
            axios
              .get(
                process.env.baseUrl +
                  `recipes.json?orderBy="ingredients/${i}/ingredient"&equalTo="${text}"`
              )
              .then(res => {
                for (const key in res.data) {
                  if (!this.$cookies.get("token")) {
                    const arr = this.$cookies.get("likedRecipes");
                    if (arr) {
                      arr.includes(key)
                        ? (res.data[key].liked = true)
                        : (res.data[key].liked = false);
                    } else {
                      res.data.liked = false;
                    }
                  }

                  commit("addRecipe", { ...res.data[key], id: key });
                }
              });
          }
        } else {
          dispatch("loadRecipes", 0);
        }
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
      loadedRecipes(state) {
        return state.loadedRecipes;
      },
      likedRecipes(state) {
        return state.loadedRecipes
          ? state.loadedRecipes.filter(a => a.liked === true)
          : [];
      },
      isAdmin(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
