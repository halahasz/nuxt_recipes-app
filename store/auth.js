import axios from "axios";

export const state = () => ({
  token: null,
  email: null,
  password: null,
});
export const mutations = {
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
};
// TODO: add snackbors
export const actions = {
  authenticateUser({ commit, dispatch }, authData) {
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
    let successMessage = "Successfully logged in";
    let failMessage = "Failed to log in, try again";
    if (!authData.isLogin) {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
      successMessage = "Successfully singed up";
      failMessage = "Failed to sing up, try again";
    }
    return axios
      .post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((res) => {
        commit("setToken", res.data.idToken);
        commit("setEmail", authData.email);
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
        dispatch(
          "snackbar/setSnackbar",
          { text: successMessage, error: false },
          {
            root: true,
          }
        );
        $nuxt.$router.push("/admin");
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          "snackbar/setSnackbar",
          { text: failMessage, error: true },
          {
            root: true,
          }
        );
      });
  },
  initAuth({ commit, dispatch }, req) {
    let token, expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("expirationDate="))
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
    return axios
      .get(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
          process.env.fbAPIKey +
          "&idToken=" +
          token
      )
      .then((res) => commit("setEmail", res.users.email));
  },
  refreshToken({ commit }) {
    return axios
      .post(
        `https://securetoken.googleapis.com/v1/token?key=${
          process.env.fbAPIKey
        }&grant_type=refresh_token&refresh_token=${this.$cookies.get(
          "refreshToken"
        )}`
      )
      .then((res) => {
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
  },
};
export const getters = {
  isAdmin(state) {
    return state.token != null;
  },
};
