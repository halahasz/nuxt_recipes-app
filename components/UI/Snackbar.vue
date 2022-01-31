<template>
  <div
    class="snackbar"
    :class="{ error: snackbarError }"
    :style="{ animationDuration: `${VisibilityDuration / 1000}s` }"
  >
    <p class="snackbar__message" v-html="snackbarMessage"></p>
  </div>
</template>

<script>
export default {
  props: {
    snackbarError: {
      type: Boolean,
      required: false,
      default: false
    },
    snackbarMessage: {
      type: String,
      required: true
    },
    VisibilityDuration: {
      type: Number,
      required: false,
      default: 2000
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.snackbar {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $green;
  padding: 20px 30px;
  border-radius: 30px;
  z-index: 10000;
  font-weight: 500;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  animation-name: show;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
  box-shadow: 0 2px 25px -5px rgba(0, 0, 0, 0.2);
  min-width: 270px;
  &.error {
    background-color: $red;
  }
  &__message {
    margin-bottom: 0;
    color: $white;
    font-size: 1.6rem;
    text-align: center;
  }
}

@keyframes show {
  0% {
    opacity: 0;
    top: 27%;
  }
  20% {
    opacity: 1;
    top: 30%;
  }
  80% {
    opacity: 1;
    top: 30%;
  }
  100% {
    opacity: 0;
    top: 33%;
  }
}
</style>
