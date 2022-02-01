<template>
  <div class="recipe-container">
    <nuxt-link class="recipe-card" :to="'/recipes/' + recipe.id">
      <article
        class="recipe-preview"
        :style="{
          'background-image': `url(${
            recipe.photo ||
            require(`@/assets/img/food-placeholder-${
              recipe.title.length % 5
            }.jpg`)
          })`,
        }"
      >
        <h2>{{ recipe.title }}</h2>
      </article>
    </nuxt-link>
    <FilledHeartIcon
      class="recipe-heart"
      v-if="like"
      :recipe="recipe"
      @onDislike="like = false"
      @mouseover.native="onHover"
      @mouseleave.native="onMouseLeave"
    />
    <EmptyHeartIcon
      class="recipe-heart"
      v-else
      :recipe="recipe"
      @onLike="like = true"
      @mouseover.native="onHover"
      @mouseleave.native="onMouseLeave"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FilledHeartIcon from "@/components/UI/Icons/FilledHeart";
import EmptyHeartIcon from "@/components/UI/Icons/EmptyHeart";

export default {
  components: {
    FilledHeartIcon,
    EmptyHeartIcon,
  },
  data() {
    return {
      like: this.recipe.liked,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["loadedRecipes"]),
    ...mapGetters(["isAdmin"]),
  },
  methods: {
    onHover() {
      this.$vnode.elm.querySelector(".recipe-preview").classList.add("hovered");
    },
    onMouseLeave() {
      this.$vnode.elm
        .querySelector(".recipe-preview")
        .classList.remove("hovered");
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";
.recipe {
  transition: $transition;
  flex-basis: 100%;
  padding: 0 15px;
  @include mQuery(mobile) {
    flex-basis: 50%;
  }
  @include mQuery(desktop) {
    flex-basis: 33.33333%;
  }
}
.recipe-container {
  position: relative;
  width: 100%;
}
.recipe-card {
  text-decoration: none;
  width: 100%;
  display: block;
}
.recipe-heart {
  cursor: pointer;
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
}
.recipe-preview {
  filter: brightness(1.3);
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  margin: 15px 0;
  min-height: 400px;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 3px 5px -1px rgba(158, 116, 88, 0.2),
    0px 6px 10px 0px rgba(158, 116, 88, 0.14),
    0px 1px 18px 0px rgba(158, 116, 88, 0.12);
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  border: 0;
  transition: $transition;
  min-height: 270px;
  @include mQuery(mobile) {
    min-height: 310px;
  }
  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.8));
    transition: $transition;
  }
  &:hover,
  &.hovered {
    transform: scale(1.05);
    filter: brightness(1.5);
    transition: $transition;
    &:before {
      background-color: rgba($primary, 0.2);
    }
  }
  h2 {
    width: 100%;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.9);
    font-size: 23px;
    position: absolute;
    z-index: 5;
    padding: 0px 30px;
    font-weight: 600;
    bottom: 20px;
  }
  img {
    position: absolute;
    z-index: 5;
    top: 40px;
    right: 40px;
    max-width: 400px;
  }
}
</style>
