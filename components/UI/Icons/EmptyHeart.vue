<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26.211"
    height="23.432"
    viewBox="0 0 26.211 23.432"
    @click="onLike"
  >
    <path
      id="Path_3"
      data-name="Path 3"
      d="M18.818,16.033A6.631,6.631,0,0,0,14,18.113a7.3,7.3,0,0,0-.011,10.014L24.606,39.262a.719.719,0,0,0,1,0q5.313-5.56,10.617-11.124a7.294,7.294,0,0,0,0-10.014,6.627,6.627,0,0,0-9.647,0l-1.466,1.52-1.466-1.531a6.548,6.548,0,0,0-4.829-2.08Zm0,1.358a5.3,5.3,0,0,1,3.837,1.682l1.962,2.059a.718.718,0,0,0,1,0l1.951-2.048a5.206,5.206,0,0,1,7.664,0,5.914,5.914,0,0,1,0,8.106q-5.06,5.295-10.122,10.6L14.991,27.178a5.916,5.916,0,0,1,0-8.106A5.274,5.274,0,0,1,18.818,17.391Z"
      transform="translate(-12.005 -16.033)"
      fill="#fff"
    />
  </svg>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onLike() {
      this.$store.dispatch("editRecipeLike", {
        ...this.recipe,
        liked: true,
      });
      this.$emit("onLike", true);
    },
  },
};
</script>
