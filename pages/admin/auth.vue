<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <h1 class="page-title">
        Authentication
      </h1>
      <form @submit.prevent="onSubmit">
        <Input required type="email" v-model="email" label="E-Mail Address" />
        <Input required type="password" v-model="password" label="Password" />
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

export default {
  name: "AdminAuthPage",
  layout: "admin",
  components: {
    Input,
    Button
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
        });
    }
  }
};
</script>

<style lang="scss" scoped>
/* .admin-auth-page {
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
} */
.auth-container {
  width: 60%;
  padding: 0px 30px 0;
  margin-left: 20%;
}
</style>
