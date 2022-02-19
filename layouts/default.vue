<template>
  <div @click="startLogoutInterval">
    <Snackbar
      :snackbarError="snackbarError"
      :snackbarMessage="snackbarMessage"
      v-if="showSnackbar"
      @animationend.native="setShowSnackbar"
    />
    <transition name="slide-fade">
      <Header :title="title" v-if="loaded" />
    </transition>
    <div class="container-base">
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Section/Header";
import Footer from "@/components/Section/Footer";
import Snackbar from "@/components/UI/Snackbar";
import { mapState, mapGetters } from "vuex";

export default {
  transition: "page",
  components: {
    Header,
    Footer,
    Snackbar,
  },
  data() {
    return {
      logoutTimeout: null,
      refreshInterval: null,
      loaded: false,
    };
  },
  computed: {
    ...mapState({
      snackbarMessage: (state) => state.snackbar.snackbarMessage,
      snackbarError: (state) => state.snackbar.snackbarError,
      showSnackbar: (state) => state.snackbar.showSnackbar,
      searchText: (state) => state.searchText,
    }),
    ...mapGetters({ isAdmin: "auth/isAdmin" }),
    title() {
      if (this.$route.path === "/" && this.searchText == "") {
        return "My recipes";
      } else if (this.$route.path === "/" && this.searchText != "") {
        return "My search results";
      } else {
        return (
          this.$route.path.split("/")[1].slice(0, 1).toUpperCase() +
          this.$route.path.split("/")[1].slice(1).replace("-", " ")
        );
      }
    },
  },
  mounted() {
    this.loaded = true;
    // checking user activity
    if (this.logoutTimeout === null && this.isAdmin) {
      this.startLogoutInterval();
    }
    // check refresh  every 2 min.
    if (this.isAdmin) {
      this.refreshInterval = setInterval(
        () => this.checkRefresh(),
        1000 * 60 * 2
      ); //2 min.
    }
  },
  methods: {
    setShowSnackbar() {
      this.$store.commit("snackbar/setShowSnackbar", false);
    },
    //  expiration time is check every 2 min., it is refreshed if it's lower then 10 min.
    async checkRefresh() {
      let expDate = this.$cookies.get("expirationDate");
      let currDate = new Date().getTime();
      let diff = Math.round(expDate - currDate);

      if (diff <= 1000 * 60 * 10) {
        try {
          await this.$store.dispatch("refresh");
        } catch (error) {
          console.log(error);
          this.$store.dispatch("logout");
        }
      }
    },
    // automatic logout after 15 minutes of inactivity
    startLogoutInterval() {
      if (this.isAdmin) {
        clearTimeout(this.logoutTimeout);
        this.logoutTimeout = setTimeout(() => {
          this.$store.dispatch("logout");
          this.$router.push("/admin/auth");
          console.log("logged out");
        }, 1000 * 60 * 15);
      }
    },
  },
  beforeDestroy() {
    if (this.isAdmin) {
      clearTimeout(this.logoutTimeout);
      clearTimeout(this.refreshInterval);
    }
  },
};
</script>
