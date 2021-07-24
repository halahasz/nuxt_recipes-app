import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedRecipes: [],
      recipesNum: 6,
      allRecipesLoaded: false,
      loading: false,
      token: null,
      email: null,
      password: null
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
            const arr = Object.entries(res.data);
            if (
              arr.length === state.loadedRecipes.length &&
              arr.length != state.recipesNum
            ) {
              commit("setAllRecipesLoaded", true);
            }
            const recipesArray = [];
            for (const key in res.data) {
              recipesArray.unshift({ ...res.data[key], id: key });
            }

            if (!this.$cookies.get("jwt")) {
              const arr = this.$cookies.get("likedRecipes");
              recipesArray.map(el =>
                arr.includes(el.id) ? (el.liked = true) : (el.liked = false)
              );
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
      loadLikedRecipes({ commit, state }, id) {
        return axios
          .get(
            process.env.baseUrl +
              `recipes.json?orderBy="id"&equalTo=${id}&auth=${state.token}`
          )
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
      addRecipe({ commit, state }, recipe) {
        const createdRecipe = {
          ...recipe
        };
        return axios
          .post(process.env.baseUrl + "recipes.json?auth=" + state.token, {
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
      deleteRecipe({ commit, state }, deletedRecipe) {
        return axios
          .delete(
            process.env.baseUrl +
              "recipes/" +
              deletedRecipe.id +
              ".json?auth=" +
              state.token,
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
              state.token,
            editedRecipe
          )
          .then(res => {
            commit("editRecipe", editedRecipe);
          })
          .catch(e => console.log(e));
      },
      editLikedRecipe({ commit, state }, editedRecipe) {
        return axios
          .put(
            process.env.baseUrl +
              "recipes/" +
              editedRecipe.id +
              ".json?auth=" +
              state.token,
            editedRecipe
          )
          .then(res => {
            commit("editLikedRecipe", this.id, editedRecipe);
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
            localStorage.setItem(
              "expirationDate",
              new Date().getTime() + +res.data.expiresIn * 1000
            );
            this.$cookies.set("jwt", res.data.idToken);
            this.$cookies.set(
              "expirationDate",
              new Date().getTime() + +res.data.expiresIn * 1000
            );
          });
      },
      initAuth({ commit, dispatch, state }, req) {
        let token, expirationDate;
        if (req) {
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
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
        this.$cookies.remove("jwt");
        this.$cookies.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
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
