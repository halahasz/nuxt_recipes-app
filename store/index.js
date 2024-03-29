import axios from "axios";

export const state = () => ({
  loadedRecipes: [],
  likedRecipes: [],
  searchedRecipes: [],
  recipesNum: 6,
  isAllRecipesLoaded: false,
  searchText: "",
  loading: false,
});
export const mutations = {
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
      (recipe) => recipe.id === editedRecipe.id
    );
    state.loadedRecipes[recipeIndex] = editedRecipe;
  },
  setDeletedRecipe(state, deletedRecipe) {
    const recipeIndex = state.loadedRecipes.findIndex(
      (recipe) => recipe.id == deletedRecipe.id
    );
    let newArr = state.loadedRecipes.splice(recipeIndex, 1);
    state.loadedRecipes = newArr;
  },
  setSearchText(state, text) {
    state.searchText = text;
  },
  clearRecipes(state) {
    state.searchedRecipes = [];
  },
};

export const actions = {
  async loadRecipes({ commit, dispatch, state, rootState }, num) {
    commit("setLoading", true);
    const recipesNum = state.recipesNum + num;
    let url = process.env.baseUrl + "recipes.json";
    if (rootState.auth.token != null) {
      let res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          rootState.auth.token
      );
      commit("setEmail", res.data.users[0].email);
      url =
        process.env.baseAuthUrl + rootState.auth.email.split("@")[0] + ".json";
    }
    return axios
      .get(url + `?orderBy="order"&limitToFirst=${recipesNum}`)
      .then((res) => {
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
      .catch((e) => {
        commit("setLoading", false);
        console.log(e);
        dispatch("setSnackbar", {
          text: "There was a problem loading recipes",
          error: true,
        });
      });
  },
  async searchRecipes({ commit, dispatch, rootState }, text) {
    if (text.length) {
      commit("setLoading", true);
      try {
        let arr = [];
        let url = process.env.baseUrl + "recipes.json";
        if (rootState.auth.token != null) {
          url =
            process.env.baseAuthUrl +
            rootState.auth.email.split("@")[0] +
            ".json";
        }
        for (let i = 0; i < 12; i++) {
          let res = await axios.get(
            url + `?orderBy="ingredients/${i}/ingredient"&equalTo="${text}"`
          );
          for (const key in res.data) {
            arr.push({
              ...res.data[key],
              id: key,
            });
          }
        }
        commit("setSearchedRecipes", arr);
        commit("setLoading", false);
      } catch (e) {
        console.log(e);
        commit("setLoading", false);
        dispatch("setSnackbar", {
          text: "There is a problem with searching recipes",
          error: true,
        });
      }
    } else {
      commit("clearRecipes");
    }
  },
  async loadLikedRecipes({ commit, dispatch, rootState }) {
    let url = process.env.baseUrl + "recipes.json";
    if (rootState.auth.token != null) {
      let res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          rootState.auth.token
      );
      commit("setEmail", res.data.users[0].email);
      url =
        process.env.baseAuthUrl + rootState.auth.email.split("@")[0] + ".json";
    }
    return axios
      .get(url + '?orderBy="liked"&equalTo=true')
      .then((res) => {
        const recipesArray = [];
        for (const key in res.data) {
          recipesArray.unshift({ ...res.data[key], id: key });
        }
        const sortedArr = recipesArray.sort((a, b) => a.order - b.order);
        commit("setLikedRecipes", sortedArr);
        return sortedArr;
      })
      .catch((e) => {
        console.log(e);
        dispatch("snackbar/setSnackbar", {
          text: "There was a problem loading the liked recipes",
          error: true,
        });
      });
  },
  async editRecipe({ commit, dispatch, rootState }, editedRecipe) {
    commit("setEditedRecipe", editedRecipe);
    let url = process.env.baseUrl + "recipes/" + editedRecipe.id + ".json";
    if (rootState.auth.token != null) {
      let res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          rootState.auth.token
      );
      commit("setEmail", res.data.users[0].email);
      url =
        process.env.baseAuthUrl +
        rootState.auth.email.split("@")[0] +
        "/" +
        editedRecipe.id +
        ".json?auth=" +
        rootState.auth.token;
    }
    return axios
      .put(url, editedRecipe)
      .then(() => {
        dispatch("snackbar/setSnackbar", {
          text: "The recipe has been updated",
          error: false,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch("snackbar/setSnackbar", {
          text: "There was a problem updating the recipe",
          error: true,
        });
      });
  },
  async editRecipeLike({ commit, rootState }, editedRecipe) {
    commit("setEditedRecipe", editedRecipe);
    let url = process.env.baseUrl + "recipes/" + editedRecipe.id + ".json";
    if (rootState.auth.token != null) {
      let res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          rootState.auth.token
      );
      commit("setEmail", res.data.users[0].email);
      url =
        process.env.baseAuthUrl +
        rootState.auth.email.split("@")[0] +
        "/" +
        editedRecipe.id +
        ".json?auth=" +
        rootState.auth.token;
    }
    return axios
      .put(url, editedRecipe)
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  },
  filterRecipes({ commit, state }, id) {
    const filteredRecipes = state.likedRecipes.filter((el) => el.id != id);
    commit("setLikedRecipes", filteredRecipes);
  },
  async loadRecipe({ commit, dispatch, rootState }, id) {
    let url = process.env.baseUrl + "recipes/";
    if (rootState.auth.token != null) {
      let res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          rootState.auth.token
      );
      commit("setEmail", res.data.users[0].email);
      url = process.env.baseAuthUrl + rootState.auth.email.split("@")[0] + "/";
    }
    return axios
      .get(url + `${id}.json`)
      .then((res) => {
        return { ...res.data };
      })
      .catch((e) => {
        console.log(e);
        dispatch("snackbar/setSnackbar", {
          text: "There was a problem loading the recipe",
          error: true,
        });
      });
  },
  async addRecipe({ commit, dispatch, rootState }, recipe) {
    const createdRecipe = {
      ...recipe,
    };
    let url = process.env.baseUrl + "recipes.json";
    if (rootState.auth.token != null) {
      let res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          rootState.auth.token
      );
      commit("setEmail", res.data.users[0].email);
      url =
        process.env.baseAuthUrl +
        rootState.auth.email.split("@")[0] +
        ".json?auth=" +
        rootState.auth.token;
    }
    return axios
      .post(url, {
        ...recipe,
      })
      .then((result) => {
        createdRecipe.id = result.data.name;
        commit("setAddedRecipe", {
          ...createdRecipe,
        });
        dispatch("snackbar/setSnackbar", {
          text: "There recipe has been successfully added",
          error: false,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch("snackbar/setSnackbar", {
          text: "There was a problem adding the recipe",
          error: true,
        });
      });
  },
  async deleteRecipe({ commit, dispatch, rootState }, deletedRecipe) {
    let url = process.env.baseUrl + "recipes/" + deletedRecipe.id + ".json";
    if (rootState.auth.token != null) {
      let res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          rootState.auth.token
      );
      commit("setEmail", res.data.users[0].email);
      url =
        process.env.baseAuthUrl +
        rootState.auth.email.split("@")[0] +
        "/" +
        deletedRecipe.id +
        ".json?auth=" +
        rootState.auth.token;
    }
    return axios
      .delete(url, deletedRecipe)
      .then((result) => {
        deletedRecipe.id = result.config.id;
        commit("setDeletedRecipe", deletedRecipe);
        dispatch("snackbar/setSnackbar", {
          text: "There recipe has been successfully deleted",
          error: false,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch("snackbar/setSnackbar", {
          text: "There was a problem deleting the recipe",
          error: true,
        });
      });
  },
};
