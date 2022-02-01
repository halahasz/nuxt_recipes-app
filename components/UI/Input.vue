<template>
  <div class="input">
    <input
      @change="handleInput"
      :value="value"
      :type="type"
      :class="['input__field', { bold: bold }]"
      :placeholder="label"
      :name="label"
      :required="required"
    />
    <label :class="['input__label', { bold: bold }]" :for="label">{{
      label
    }}</label>
    <p v-if="invalid" class="input__invalid">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  emits: ["validation"],
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    bold: {
      type: Boolean,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      sort: this.type || "text",
      invalid: false,
      errorMessage: "",
    };
  },
  methods: {
    handleInput(e) {
      if (this.type === "password" && e.target.value.length < 6) {
        this.invalid = true;
        this.errorMessage = "Password length should be at least 6 characters";
        this.$emit("validation", false);
      } else {
        this.invalid = false;
        this.$emit("input", e.target.value);
        document.querySelector("*").classList.add("remove-transition");
        this.$emit("validation", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.input {
  position: relative;
  position: relative;
  padding: 15px 0 0;
  margin: 17px auto 20px;
  width: 100%;
  background-color: transparent;
}
.input__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  height: 30px;
  border-bottom: 1px solid $grey;
  outline: 0;
  font-size: 1.4rem;
  padding: 7px 10px 7px;
  background: transparent;
  transition: all 0.2s;
  color: $accent;
  @include mQuery(tablet) {
    padding: 7px 30px 7px 15px;
  }
  &.bold {
    font-weight: 700;
  }
  &:focus {
    background-color: transparent;
    border-bottom: 1px solid $primary;
  }
  &:focus ~ .input__label {
    left: 10px;
    @include mQuery(desktop) {
      left: 15px;
    }
  }
  &:active {
    background-color: transparent;
    border-bottom: 1px solid $primary;
  }

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .input__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
    left: 10px;
    @include mQuery(desktop) {
      font-size: 1.4rem;
      top: 15px;
      left: 15px;
    }
  }
}
.input__label {
  position: absolute;
  top: 0;
  left: 10px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  color: $grey;
  pointer-events: none;
  @include mQuery(desktop) {
    left: 15px;
  }
  &.bold {
    font-weight: 700;
  }
}

.input__field:focus {
  ~ .input__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
  }
}
.input__field {
  &:required,
  &:invalid {
    box-shadow: none;
    background-color: transparent;
  }
}
.input__invalid {
  position: absolute;
  content: "";
  left: 5px;
  bottom: -15px;
  color: $primary;
}
</style>
