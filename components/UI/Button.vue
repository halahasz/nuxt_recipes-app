<template>
  <button @click="$emit('click')" :class="['btn', color]" :type="type">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: "button"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables";

.btn {
  text-transform: none;
  cursor: pointer;
  box-shadow: $box-shadow;
  transition: all 0.3s ease-in-out;
  padding: 0 20px;
  padding-bottom: 2px;
  border-radius: 28px;
  height: 36px;
  margin: 20px 10px;
  letter-spacing: 1px;
  margin-top: 20px;
  display: block;
  color: $white;
  background-color: $primary;
  &:hover {
    box-shadow: $box-shadow-light;
    background-color: $primary-light;
  }
  &.white {
    color: $primary;
    background-color: $white;
  }
  &.red {
    color: $white;
    background-color: $red;
    &:hover {
      background-color: $red-dark;
    }
  }
}
</style>
