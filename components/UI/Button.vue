<template>
  <button
    @click="$emit('click')"
    :class="['btn', color, { center: center }]"
    :type="type"
  >
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
    center: {
      type: Boolean,
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
  padding: 11px 20px 12px;
  border-radius: 28px;
  border: none;
  margin: 20px auto;
  letter-spacing: 1px;
  display: block;
  color: $white;
  background-color: $primary;
  &-absolute {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
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
  &.center {
    display: block;
    margin: 20px auto 0;
  }
}
</style>
