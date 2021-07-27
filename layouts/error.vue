<template>
  <v-app dark>
    <h1 class="page-title" v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 class="page-title" v-else>
      {{ otherError }}
    </h1>
    <Button text="Home page" center @click="onClick" />
  </v-app>
</template>

<script>
import Button from "@/components/UI/Button";
export default {
  layout: "empty",
  components: {
    Button
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  methods: {
    onClick() {
      this.$router.push("/");
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
