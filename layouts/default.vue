<template>
  <div class="container-base">
    <Header />

    <!-- Menu Mobile -->
    <!-- <transition name="slide-fade">
      <MenuMobile v-if="showMenuMobile === true" />
    </transition> -->
    <div class="wrapper-base">
      <nuxt />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "@/components/Section/Header";
export default {
  components: {
    Header
  }
};
</script>
