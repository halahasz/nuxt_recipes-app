<template>
  <div class="header" :class="{ scrolled: scrolled }">
    <div class="header-wrapper">
      <h1 class="header-title">
        {{ title }}
      </h1>
      <ul class="nav">
        <li class="nav-item">
          <nuxt-link :to="'/'" exact> <HomeIcon /></nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="'/liked-recipes'"><LikeIcon /> </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="'/add-recipe'">
            <AddIcon />
          </nuxt-link>
        </li>

        <li class="nav-item">
          <nuxt-link :to="'/admin'">
            <AdminIcon />
          </nuxt-link>
        </li>
      </ul>
      <div class="header-search">
        <RecipeSearch :loaded="loaded" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeSearch from "@/components/UI/RecipeSearch";
import HomeIcon from "@/components/UI/Icons/HomeIcon";
import LikeIcon from "@/components/UI/Icons/LikeIcon";
import AddIcon from "@/components/UI/Icons/AddIcon";
import AdminIcon from "@/components/UI/Icons/AdminIcon";

export default {
  components: {
    RecipeSearch,
    HomeIcon,
    LikeIcon,
    AddIcon,
    AdminIcon
  },
  props: ["title"],
  data() {
    return {
      scrolled: false,
      loaded: false
    };
  },
  methods: {
    handleScroll() {
      window.scrollY > 50 ? (this.scrolled = true) : (this.scrolled = false);
    }
  },
  mounted() {
    this.loaded = true;
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";

.header {
  height: 90px;
  display: flex;
  position: fixed;
  justify-content: center;
  top: 0;
  align-items: center;
  width: 100vw;
  left: 0;
  right: 0;
  box-shadow: $box-shadow;
  background-color: $white;
  z-index: 100;
  transition: $transition;
  &.scrolled {
    height: 60px;
    .form_group {
      padding: 12px 0 0;
    }
    .header-title {
      font-size: 25px;
      padding-bottom: 6px;
      &:before {
        content: "";
        width: 100px;
        bottom: 0;
      }
    }
    .btn-search {
      width: 40px;
      height: 40px;
      right: -60px;
      top: 4px;
      svg {
        transform: scale(0.9);
      }
    }
  }
  &-wrapper {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-search,
    .header-title {
      flex-basis: 40%;
    }
    .header-search {
      display: flex;
      justify-content: flex-end;
      padding-right: 40px;
    }
  }
  &-title {
    font-size: 30px;
    transition: $transition;
    color: $white;
    text-shadow: 0px 0px 4px rgba($accent, 1);
    padding-left: 50px;
    z-index: 2;
    position: relative;
    padding-bottom: 15px;
    &:before {
      position: absolute;
      transition: $transition;
      content: "";
      width: 170px;
      height: 1px;
      background-color: $primary;
      left: 15px;
      bottom: 7px;
    }
  }
}

.nav {
  padding-left: 0;
  list-style: none;
  display: flex;
  &-item {
    display: block;
    height: 60px;
    width: 60px;
    svg {
      display: block;
      margin: 18px auto 18px;
    }
  }
  &-item:last-child {
    .nuxt-link-active {
      svg {
        path,
        circle {
          stroke: #f60;
          fill: none;
        }
        .circle {
          fill: #f60;
        }
      }
    }
  }
}
.nuxt-link-active {
  svg {
    path {
      fill: #f86600;
    }
  }
}
</style>
