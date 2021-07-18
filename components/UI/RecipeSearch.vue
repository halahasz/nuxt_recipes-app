<template>
  <div>
    <form class="recipes-form" @submit.prevent="onSubmit">
      <input type="text" v-model="text" placeholder="Search ..." />
      <button color="#fff" class="btn-add" fab @click.prevent="onSubmit">
        <svg
          id="Search"
          @click="onSearch"
          xmlns="http://www.w3.org/2000/svg"
          width="22.412"
          height="21.343"
          viewBox="0 0 22.412 21.343"
        >
          <g id="Group_5" data-name="Group 5">
            <path
              id="Path_2"
              data-name="Path 2"
              d="M22.279,20.5,16.8,15.013a9.287,9.287,0,1,0-7.434,3.748h.31a9.293,9.293,0,0,0,6.331-2.788l5.4,5.4a.618.618,0,1,0,.874-.874ZM9.635,17.522A8.074,8.074,0,1,1,9.068,1.383H9.35a8.072,8.072,0,0,1,.285,16.138Z"
              transform="translate(-0.047 -0.209)"
            />
          </g>
        </svg>
      </button>
    </form>
    <p v-if="text" style="text-align: center">
      Search results for:
      <b>{{ text }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "RecipeSearch",
  emits: ["search-text"],
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
