<template>
  <div>
    <transition name="slide-fade">
      <form class="search-form" v-if="loaded">
        <Input label="Search ingredient ..." v-model.trim="text" />
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
import SearchIcon from "@/components/UI/Icons/SearchIcon";

export default {
  name: "SearchForm",
  emits: ["search-text"],
  components: {
    Input,
    SearchIcon
  },
  data() {
    return {
      loaded: false
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
      }
    }
  },
  methods: {
    onSearch() {
      this.$store.dispatch("searchRecipes", this.text);
      this.$store.commit("setSearchText", this.text);
      this.$router.push({ path: "/search?ingredient=" + this.text });
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
  transition: $transition;
  transition-delay: 0.5s;
  &:host {
    display: block;
  }
  .btn-search {
    position: absolute;
    content: "";
    top: 0;
    background: #fff;
    width: 45px;
    height: 45px;
    border-radius: 30px;
    transition: $transition;
    margin: 0 auto 15px;
    display: block;
    right: -55px;
    border: none;
    cursor: pointer;
    box-shadow: $box-shadow-search;
    svg {
      height: 20px;
      transition: $transition;
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
