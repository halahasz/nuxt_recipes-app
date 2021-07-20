<template>
  <div class="search-form-container">
    <form class="search-form" @submit.prevent="onSubmit">
      <Input label="Search ingredient ..." v-model.trim="text" />
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
import Input from "@/components/UI/Input";

export default {
  name: "RecipeSearch",
  emits: ["search-text"],
  components: {
    Input
  },
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

.search-form-container {
  position: sticky;
  top: 70px;
  z-index: 100;
}
.search-form {
  width: 250px;
  margin: 0 auto;
  position: relative;
  left: -35px;
  &:host {
    display: block;
  }
  .btn-add {
    margin: 0 auto 15px;
    display: block;
    right: -70px;
  }
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
