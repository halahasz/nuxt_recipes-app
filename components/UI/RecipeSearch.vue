<template>
  <div>
    <form class="search-form" @submit.prevent="onSubmit">
      <div class="form__group">
        <input
          v-model.trim="text"
          type="text"
          class="form__field"
          placeholder=" "
          name="text"
          required
        />
        <label for="text" class="form__label">Search ingredient ...</label>
      </div>

      <button color="#fff" class="btn-add" fab @click.prevent="onSubmit">
        <svg
          id="Search"
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.search-form {
  width: 250px;
  margin: 10px auto;
  position: relative;
  left: -35px;
  .btn-add {
    margin: 0 auto 15px;
    display: block;
    right: -70px;
  }
  /* input {
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
  } */
}
.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  height: 30px;
  border-bottom: 1px solid $grey;
  outline: 0;
  font-size: 1.4rem;
  padding: 7px 0 7px 5px;
  background: transparent;
  transition: border-color 0.2s;
  &:focus {
    background-color: transparent;
    border-bottom: 1px solid $primary;
  }
  &:focus ~ .form__label {
    left: 5px;
  }
  &:active {
    background-color: transparent;
    border-bottom: 2px solid $primary;
  }

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 25px;
    left: 5px;
    @include mQuery(desktop) {
      font-size: 1.4rem;
      top: 15px;
    }
  }
}
.form__label {
  position: absolute;
  top: 0;
  left: 5px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  color: $grey;
  pointer-events: none;
}
.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
  }
  padding-bottom: 6px;
}
/* reset input */
.form__field {
  &:required,
  &:invalid {
    box-shadow: none;
    background-color: transparent;
  }
}
</style>
