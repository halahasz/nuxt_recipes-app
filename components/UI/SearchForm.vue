<template>
  <div>
    <transition name="slide-fade">
      <form class="search-form" v-if="loaded">
        <Input label="Search ingredient ..." v-model.trim="text" />
        <Button
          text="-"
          v-if="text.length"
          look="minus"
          color="white"
          @click="text = ''"
        />
        <button
          type="submit"
          @click.prevent="onSearch"
          color="#fff"
          class="btn-search"
        >
          <SearchIcon />
        </button>
      </form>
    </transition>
  </div>
</template>

<script>
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import SearchIcon from "@/components/UI/Icons/SearchIcon";

export default {
  name: "SearchForm",
  emits: ["search-text"],
  components: {
    Input,
    Button,
    SearchIcon,
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.loaded = true;
  },
  computed: {
    text: {
      get() {
        return this.$store.state.searchText;
      },
      set(value) {
        return this.$store.commit("setSearchText", value);
      },
    },
  },
  methods: {
    onSearch() {
      this.$store.dispatch("searchRecipes", this.text);
      this.$store.commit("setSearchText", this.text);
      this.$router.push({ path: "/search?ingredient=" + this.text });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.search-form {
  width: 140px;
  margin: 0 auto;
  position: relative;
  left: -35px;
  transition: $transition;
  transition-delay: 0.5s;
  @include mQuery(tablet) {
    width: 250px;
  }
  &:host {
    display: block;
  }
  .input {
    margin: 0 auto;
    /* padding-top: 10px; */
    margin-top: 5px;
    @include mQuery(tablet) {
      margin: 17px auto 20px;
    }
  }
  .btn-search {
    position: absolute;
    content: "";
    top: 10px;
    background: #fff;
    width: 35px;
    height: 35px;
    border-radius: 30px;
    transition: $transition;
    margin: 0 auto;
    display: block;
    right: -40px;
    border: none;
    cursor: pointer;
    box-shadow: $box-shadow-search;
    @include mQuery(tablet) {
      margin: 0 auto 15px;
      width: 45px;
      height: 45px;
      right: -55px;
      top: 0;
    }
    svg {
      height: 20px;
      transition: $transition;
      transform: scale(0.9);
      @include mQuery(tablet) {
        transform: scale(1);
      }
      path,
      circle {
        transition: $transition;
      }
    }

    &:hover {
      box-shadow: $box-shadow-searchDark;
      svg {
        path,
        circle {
          fill: #f60;
        }
      }
    }
  }
}
</style>
