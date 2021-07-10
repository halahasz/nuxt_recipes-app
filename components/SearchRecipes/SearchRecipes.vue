<template>
  <div>
    <form class="recipes-form" @submit.prevent="onSubmit">
      <v-text-field
        color="#fa6a18"
        v-model="text"
        :value="text"
        label="Search ..."
      ></v-text-field>
      <v-btn color="#fff" class="btn-add" fab @click.prevent="onSubmit">
        <!-- <img src="~assets/img/search.svg" alt /> -->
      </v-btn>
    </form>
    <p v-if="text" style="text-align: center">
      Search results for:
      <b>{{ text }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "SearchRecipes",
  data() {
    return {
      text: ""
    };
  },
  methods: {
    onSubmit() {
      this.$emit("search-text", this.text.toLowerCase());
      document.querySelector(".recipes-form").reset();
    }
  }
};
</script>

<style scoped lang="scss">
button {
  margin: 0 auto 15px;
  display: block;
}
form {
  padding-top: 1rem;
  @media (min-width: 800px) {
    width: 60%;
    margin-left: 20%;
  }
}
input {
  border: 1px solid rgb(179, 218, 176);
  padding: 10px;
  border-radius: 5px;
}
input:focus,
input:active {
  outline: none;
  box-shadow: 0 5px 15px -7px rgb(184, 224, 181);
}
input[type="submit"] {
  background: rgb(179, 218, 176);
  color: white;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 1rem;
  transition: all 0.2s ease-in-out;
}
input[type="submit"]:hover {
  background: transparent;
  border: 1px solid rgb(149, 194, 147);
  color: rgb(69, 78, 119);
  box-shadow: 0 5px 15px -7px rgb(184, 224, 181);
}
</style>
