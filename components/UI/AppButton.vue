<template>
  <button
    @click="$emit('click')"
    :class="[look, color, { center: center }]"
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
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    center: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "button",
    },
    look: {
      type: String,
      required: false,
      default: "btn",
    },
  },
};
</script>

<style lang="scss">
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
  display: inline-block;
  text-decoration: none;
  color: $white;
  background-color: $primary;
  &.absolute {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
  }

  &:hover {
    box-shadow: $box-shadow-light;
    background-color: $primary-light;
  }
}
.white {
  color: $primary;
  background-color: $white;
  &:hover {
    color: $primary;
    background-color: $white;
  }
}
.red {
  color: $white;
  background-color: $red;
  :hover {
    background-color: $red-dark;
  }
}
.center {
  display: block;
  margin: 20px auto 0;
}
.minus {
  font-size: 2.2rem;
  cursor: pointer;
  height: 22px;
  width: 22px !important;
  position: absolute;
  padding: 0;
  right: 0px;
  z-index: 10;
  border-radius: 10px;
  color: $primary;
  box-shadow: $box-shadow;
  line-height: 18px;
  background-color: $white;
  top: 5px;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: $box-shadow-light;
  }
}
</style>
