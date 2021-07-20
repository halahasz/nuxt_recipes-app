<template>
  <div class="container-bg">
    <Header />
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
  }
};
</script>
