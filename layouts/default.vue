<template>
  <div>
    <Navigation />
    <nuxt />
  </div>
</template>
<script>
import Navigation from "@/components/Navigation/Navigation";
export default {
  components: {
    Navigation
  }
};
</script>
<style>
html {
  font-family: "Open Sans", sans-serif;
  scroll-behavior: smooth;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
