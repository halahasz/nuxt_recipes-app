export const state = () => ({
  snackbarMessage: "",
  snackbarError: false,
  showSnackbar: false,
});
export const mutations = {
  setShowSnackbar(state, value) {
    state.showSnackbar = value;
  },
  setSnackbarError(state, value) {
    state.snackbarError = value;
  },
  setSnackbarMessage(state, value) {
    state.snackbarMessage = value;
  },
};
export const actions = {
  setSnackbar({ commit }, { text, error }) {
    commit("setSnackbarMessage", text);
    commit("setSnackbarError", error);
    commit("setShowSnackbar", true);
  },
};
