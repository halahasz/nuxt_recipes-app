<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <Input type="email" v-model="email" label="E-Mail Address" />
        <Input type="password" v-model="password" label="Password" />
        <button type="submit">{{ isLogin ? "Login" : "Signup" }}</button>
        <button
          type="button"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
        >
          Switch to {{ isLogin ? "Signup" : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/UI/Input";

export default {
  name: "AdminAuthPage",
  layout: "admin",
  components: {
    Input
  },
  data() {
    return {
      email: "",
      password: "",
      isLogin: false
    };
  },
  methods: {
    onSubmit() {
      if (!this.isLogin) {
        this.$store.dispatch("signUp", {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        });
      } else {
        this.$store.dispatch("signIn", {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        });
      }
    }
  }
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
