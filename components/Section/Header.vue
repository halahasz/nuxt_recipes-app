<template>
  <div class="header" :class="{ scrolled: scrolled }">
    <div class="header-wrapper">
      <transition name="fade-title">
        <div :key="title" class="header-title">
          <h1>
            {{ title }}
          </h1>
        </div>
      </transition>
      <ul class="header-nav">
        <li class="header-nav__item">
          <nuxt-link :to="'/'" exact><HomeIcon /></nuxt-link>
        </li>
        <li class="header-nav__item">
          <nuxt-link :to="'/liked-recipes'"><LikeIcon /> </nuxt-link>
        </li>
        <li class="header-nav__item">
          <nuxt-link :to="'/add-recipe'">
            <AddIcon />
          </nuxt-link>
        </li>
        <li class="header-nav__item">
          <nuxt-link :to="'/admin'">
            <AdminIcon />
          </nuxt-link>
        </li>
      </ul>
      <div class="header-search">
        <SearchForm :loaded="loaded" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/UI/SearchForm";
import HomeIcon from "@/components/UI/Icons/HomeIcon";
import LikeIcon from "@/components/UI/Icons/LikeIcon";
import AddIcon from "@/components/UI/Icons/AddIcon";
import AdminIcon from "@/components/UI/Icons/AdminIcon";

export default {
  components: {
    SearchForm,
    HomeIcon,
    LikeIcon,
    AddIcon,
    AdminIcon,
  },
  props: ["title"],
  data() {
    return {
      scrolled: false,
      loaded: false,
    };
  },
  methods: {
    handleScroll() {
      window.scrollY > 50 ? (this.scrolled = true) : (this.scrolled = false);
    },
  },
  mounted() {
    this.loaded = true;
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.header {
  height: auto;
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
  @include mQuery(tablet) {
    height: 90px;
  }
  &.scrolled {
    height: 60px;
    .form_group {
      padding: 12px 0 0;
    }
    .header-title h1 {
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
    flex-wrap: wrap;
    justify-content: space-between;
    @include mQuery(tablet) {
      flex-wrap: nowrap;
    }
  }
  &-title {
    flex-basis: 100%;
    line-height: 1.1;
    @include mQuery(tablet) {
      flex-basis: 40%;
    }
    h1 {
      font-size: 25px;
      transition: $transition;
      color: $white;
      text-shadow: 0px 0px 4px rgba($accent, 1);
      padding: 20px 10px;
      text-align: center;
      z-index: 2;
      position: relative;
      @include mQuery(tablet) {
        font-size: 30px;
        padding-bottom: 15px;
        padding-left: 65px;
        text-align: left;
      }
      &:before {
        position: absolute;
        transition: $transition;
        content: "";
        width: calc(100% - 20px);
        height: 1px;
        background-color: $primary;
        left: 10px;
        bottom: 0px;
        @include mQuery(tablet) {
          width: 170px;
          bottom: 7px;
        }
        @include mQuery(desktop) {
          left: 30px;
        }
      }
    }
  }
  &-nav {
    padding-left: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    flex-basis: 40%;
    @include mQuery(tablet) {
      flex-basis: 20%;
    }
    &__item {
      display: block;
      height: 32px;
      width: 32px;
      @include mQuery(tablet) {
        height: 40px;
        width: 40px;
      }
      @include mQuery(tablet) {
        height: 60px;
        width: 60px;
      }
      svg {
        display: block;
        margin: 3px auto;
        transform: scale(0.9);
        @include mQuery(tablet) {
          margin: 18px auto;
          transform: scale(1);
        }
        path,
        circle {
          transition: $transition;
        }
      }
      &:hover {
        svg {
          path {
            fill: #f86600;
          }
        }
      }
    }
    &__item:last-child {
      &:hover,
      .nuxt-link-active {
        svg {
          path,
          circle {
            stroke: #f60;
            fill: none;
          }
          .dot {
            fill: #f60;
            stroke: none;
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
  }
  &-search {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    flex-basis: 60%;
    padding-bottom: 25px;
    @include mQuery(tablet) {
      margin-top: 15px;
      flex-basis: 40%;
      padding-right: 40px;
    }
    @include mQuery(desktop) {
      padding-right: 55px;
    }
  }
}
</style>
