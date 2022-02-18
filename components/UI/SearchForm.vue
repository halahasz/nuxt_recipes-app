<template>
  <div>
    <transition name="slide-fade">
      <form class="search-form" v-if="loaded">
        <AppInput label="Search ingredient ..." v-model.trim="text" />
        <AppButton
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
import AppInput from "@/components/UI/AppInput";
import AppButton from "@/components/UI/AppButton";
import SearchIcon from "@/components/UI/Icons/SearchIcon";

export default {
  name: "SearchForm",
  emits: ["search-text"],
  components: {
    AppInput,
    AppButton,
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
      if (this.text == "") {
        this.$router.push({ path: "/" });
      } else {
        this.$router.push({ path: "/search?ingredient=" + this.text });
      }
      this.$store.dispatch("searchRecipes", this.text);
      this.$store.commit("setSearchText", this.text);
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
  @include mQuery(mobile) {
    width: 200px;
  }
  @include mQuery(tablet) {
    width: 180px;
  }
  @include mQuery(desktop) {
    width: 250px;
  }
  &:host {
    display: block;
  }
  .input {
    margin: 0 auto;
    margin-top: 5px;
  }
  .input__label {
    display: none;
  }
  .input__field::placeholder {
    color: $grey;
  }
  .input__field:focus ~ .input__label {
    display: none;
  }
  .btn-search {
    position: absolute;
    content: "";
    top: 5px;
    background: #fff;
    width: 45px;
    height: 45px;
    border-radius: 30px;
    transform: scale(0.8);
    transition: $transition;
    margin: 0 auto;
    display: block;
    right: -45px;
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
