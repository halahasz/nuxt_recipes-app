<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <h1 class="page-title">
        Sign up or log in to create your own list of recipes
      </h1>
      <form @submit.prevent="onSubmit">
        <AppInput
          required
          type="email"
          v-model="email"
          label="E-Mail Address"
        />
        <AppInput
          required
          type="password"
          v-model="password"
          label="Password"
        />
        <div class="btn-container">
          <AppButton type="submit" :text="isLogin ? 'Login' : 'Signup'" />
          <AppButton
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
import AppInput from "@/components/UI/AppInput";
import AppButton from "@/components/UI/AppButton";

export default {
  name: "AdminAuthPage",
  layout: "admin",
  components: {
    AppInput,
    AppButton,
  },
  data() {
    return {
      email: "",
      password: "",
      isLogin: false,
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("auth/authenticateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password,
        })
        .then(this.$router.push("/admin"));
    },
  },
};
</script>
