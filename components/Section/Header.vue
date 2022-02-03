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
    height: 80px;
  }
  &.scrolled {
    @include mQuery(tablet) {
      height: 60px;
    }
    .form_group {
      @include mQuery(tablet) {
        padding: 12px 0 0;
      }
    }
    .header-title h1 {
      font-size: 25px;
      padding: 0;
      height: 0;
      overflow: hidden;
      &:before {
        content: "";
        width: 100%;
        bottom: 0;
        @include mQuery(tablet) {
          width: 100px;
        }
      }
      @include mQuery(tablet) {
        height: auto;
        padding: 0px 10px 7px 65px;
      }
    }
    .header-search {
      .input {
        margin-top: -5px;
      }
    }
    .btn-search {
      @include mQuery(tablet) {
        width: 40px;
        height: 40px;
        right: -60px;
        top: 4px;
        svg {
          transform: scale(0.9);
        }
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
      position: relative;
      height: 68px;
      @include mQuery(tablet) {
        font-size: 30px;
        padding: 0 0 12px 65px;
        margin-top: 5px;
        text-align: left;
        height: auto;
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
          bottom: 0px;
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
    padding-left: 5px;
    flex-basis: 42%;
    height: 75px;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    @include mQuery(sm-tablet) {
      flex-basis: 3 0%;
      height: auto;
    }
    @include mQuery(tablet) {
      justify-content: center;
      flex-basis: 20%;
      height: auto;
    }
    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
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
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
    flex-basis: 58%;
    padding-bottom: 15px;
    position: relative;
    z-index: 1;
    @include mQuery(tablet) {
      flex-basis: 40%;
      padding-right: 40px;
      padding-bottom: 0;
    }
    @include mQuery(desktop) {
      padding-right: 55px;
    }
  }
}
</style>
