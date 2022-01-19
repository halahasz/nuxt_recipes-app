<template>
  <div class="admin-auth-page">
    <Snackbar
      :error="error"
      :snackbarMessage="snackbarMessage"
      :snackVisibilityDuration="snackVisibilityDuration"
      v-if="showSnackbar"
    />
    <div class="auth-container">
      <h1 class="page-title">
        Authentication
      </h1>
      <form @submit.prevent="onSubmit">
        <Input required type="email" v-model="email" label="E-Mail Address" />
        <Input
          required
          error
          type="password"
          v-model="password"
          label="Password"
          @validation="onValidation"
        />
        <div class="btn-container">
          <Button type="submit" :text="isLogin ? 'Login' : 'Signup'" />
          <Button
            color="white"
            @click="isLogin = !isLogin"
            :text="isLogin ? 'Switch to Signup' : 'Switch to Login'"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Snackbar from "@/components/UI/Snackbar";

export default {
  name: "AdminAuthPage",
  layout: "admin",
  components: {
    Input,
    Button,
    Snackbar
  },
  data() {
    return {
      formValid: false,
      email: "",
      password: "",
      isLogin: false,
      error: false,
      snackbarMessage: "",
      showSnackbar: false,
      snackVisibilityDuration: 2000
    };
  },
  watch: {},
  methods: {
    onValidation(value) {
      if (value) {
        this.formValid = true;
      } else {
        this.formValid = false;
      }
    },
    onSubmit() {
      if (this.formValid) {
        this.error = false;
        this.showSnackbar = false;
        this.$store
          .dispatch("authenticateUser", {
            isLogin: this.isLogin,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push("/admin");
            this.$store.commit("setEmail", this.email);
            this.$store.commit("setPassword", this.password);
          })
          .catch(() => {
            this.error = true;
            this.showSnackbar = true;
            this.snackbarMessage = "Invalid email or password!";
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  width: 40%;
  padding: 0px 30px 0;
  margin-left: 30%;
}
</style>
