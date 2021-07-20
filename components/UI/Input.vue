<template>
  <div class="form__group field">
    <input
      @input="handleInput"
      :value="value"
      :type="sort"
      class="form__field"
      :class="{ bold: bold }"
      :placeholder="label"
      :name="label"
    />
    <label :class="{ bold: bold }" :for="label" class="form__label">{{
      label
    }}</label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    },
    bold: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      sort: this.type || "text"
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style lang="scss">
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
  padding: 7px 0 7px 5px;
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
</style>
