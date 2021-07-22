<template>
  <div class="container-bg">
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
  }
};
</script>
