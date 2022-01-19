<template>
  <div class="form__group">
    <input
      @input="handleInput"
      :value="value"
      :type="sort"
      :class="['form__field', { bold: bold }]"
      :placeholder="label"
      :name="label"
      :required="required"
    />
    <label :class="['form__label', { bold: bold }]" :for="label">{{
      label
    }}</label>
    <p v-if="invalid" class="form__invalid">
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
      required: true
    },
    value: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    bold: {
      type: Boolean,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      sort: this.type || "text",
      invalid: false,
      errorMessage: ""
    };
  },
  computed: {
    content() {
      return this.value;
    }
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
        this.$emit("validation", true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  height: 30px;
  border-bottom: 1px solid $grey;
  outline: 0;
  font-size: 1.4rem;
  padding: 7px 30px 7px 15px;
  background: transparent;
  transition: all 0.2s;
  color: $accent;

  &.bold {
    font-weight: 700;
  }
  &:focus {
    background-color: transparent;
    border-bottom: 1px solid $primary;
  }
  &:focus ~ .form__label {
    left: 15px;
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
    left: 15px;
    @include mQuery(desktop) {
      font-size: 1.4rem;
      top: 15px;
    }
  }
}
.form__label {
  position: absolute;
  top: 0;
  left: 15px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  color: $grey;
  pointer-events: none;
  &.bold {
    font-weight: 700;
  }
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
.form__group {
  position: relative;
}
.form__invalid {
  position: absolute;
  content: "";
  left: 5px;
  bottom: -15px;
  color: $primary;
}
</style>
