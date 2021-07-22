<template>
  <div>
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

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

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
</style>
