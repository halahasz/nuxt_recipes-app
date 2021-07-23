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
export default {
  components: {
    Header
  },
  data() {
    return {
      logoutTimeout: null
    };
  },
  computed: {
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
  },
  methods: {
    // automatic logout after 15 minutes with no activity
    startLogoutInterval() {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = setTimeout(() => {
        this.$store.commit("setActive", false);
        this.$router.push("/admin/auth");
      }, 1000 * 60 * 15);
    }
  },
  beforeDestroy() {
    clearTimeout(this.logoutTimeout);
  }
};
</script>
