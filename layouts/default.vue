<template>
  <div class="container-bg" @click="startLogoutInterval">
    <Header :title="title" />
    <div class="container-base">
      <!-- Menu Mobile -->
      <!-- <transition name="slide-fade">
      <MenuMobile v-if="showMenuMobile === true" />
    </transition> -->
      <div class="wrapper-base">
        <nuxt />
      </div>
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/Section/Header";
import { mapState } from "vuex";

export default {
  components: {
    Header
  },
  data() {
    return {
      logoutTimeout: null,
      refreshInterval: null
    };
  },
  computed: {
    ...mapState({
      token: state => state.token,
      email: state => state.email,
      password: state => state.password
    }),
    title() {
      if (this.$route.path === "/") {
        return "My recipes";
      } else {
        return (
          this.$route.path
            .split("/")[1]
            .slice(0, 1)
            .toUpperCase() +
          this.$route.path
            .split("/")[1]
            .slice(1)
            .replace("-", " ")
        );
      }
    }
  },
  mounted() {
    // checking user activity
    if (this.logoutTimeout === null) {
      this.startLogoutInterval();
    }
    // refresh token every 2 min.
    this.refreshInterval = setInterval(
      () => this.checkRefreshToken(),
      1000 * 60 * 2
    ); //2 min.
  },
  methods: {
    // token expiration time is check every 2 min., it is refreshed if it's lower then 10 min.
    async checkRefreshToken() {
      let expDate = this.$cookies.get("expirationDate");
      console.log(new Date(expDate));
      let currDate = new Date().getTime();
      let diff = Math.round(expDate - currDate);

      if (diff <= 1000 * 60 * 10) {
        try {
          await this.$store.dispatch("authenticateUser", {
            isLogin: true,
            email: this.email,
            password: this.password
          });
        } catch (error) {
          console.log(error);
          this.$store.dispatch("logout");
        }
      }
    },
    // automatic logout after 15 minutes of inactivity
    startLogoutInterval() {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = setTimeout(() => {
        this.$store.dispatch("logout");
        this.$router.push("/admin/auth");
      }, 1000 * 60 * 15);
    }
  },
  beforeDestroy() {
    clearTimeout(this.logoutTimeout);
  }
};
</script>
