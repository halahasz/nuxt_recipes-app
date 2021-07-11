<template>
  <div class="container-base">
    <Header />

    <!-- Menu Mobile -->
    <!-- <transition name="slide-fade">
      <MenuMobile v-if="showMenuMobile === true" />
    </transition> -->

    <nuxt />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  }
};
</script>
