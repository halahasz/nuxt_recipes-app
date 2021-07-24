<template>
  <div class="header" :class="{ scrolled: scrolled }">
    <div class="header-wrapper">
      <h1 class="header-title">{{ title }}</h1>
      <ul class="nav">
        <li class="nav-item">
          <nuxt-link :to="'/'" exact>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19.168"
              height="21.493"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M1.691 21.493h3.946c.439.018.867-.143 1.185-.446s.501-.722.506-1.161v-6.2c-.005-.328.238-.607.564-.648h3.1c.326.041.569.32.564.648v6.2c.005.439.187.858.506 1.161s.746.464 1.185.446h4.228c.439.018.867-.143 1.185-.446s.501-.722.506-1.161v-10.8a1.73 1.73 0 0 0-.536-1.24L10.74.465a1.67 1.67 0 0 0-2.311 0L.536 7.85A1.68 1.68 0 0 0 0 9.091v10.8c.006.439.189.856.508 1.158s.745.462 1.183.444zm-.564-12.4c-.004-.158.057-.311.169-.423l7.893-7.385c.215-.197.546-.197.761 0l7.893 7.385c.112.112.173.265.169.423v10.8a.5.5 0 0 1-.564.479h-4.2a.5.5 0 0 1-.564-.479v-6.2a1.77 1.77 0 0 0-1.691-1.776h-3.1A1.75 1.75 0 0 0 6.2 13.685v6.2a.5.5 0 0 1-.564.479H1.691a.5.5 0 0 1-.564-.479z"
              />
            </svg>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="'/favourites-recipes'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26.211"
              height="23.432"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M6.813 0a6.63 6.63 0 0 0-4.818 2.08 7.3 7.3 0 0 0-.011 10.014l10.617 11.135a.72.72 0 0 0 1 0q5.313-5.56 10.617-11.124c2.653-2.811 2.653-7.203 0-10.014C22.966.762 21.221.008 19.395.008s-3.571.754-4.824 2.083l-1.466 1.52-1.466-1.531A6.55 6.55 0 0 0 6.81 0zm0 1.358A5.3 5.3 0 0 1 10.65 3.04l1.962 2.059a.72.72 0 0 0 1 0l1.951-2.048c.986-1.072 2.376-1.682 3.832-1.682s2.846.61 3.832 1.682c2.143 2.277 2.143 5.829 0 8.106q-5.06 5.295-10.122 10.6L2.986 11.145c-2.142-2.278-2.142-5.828 0-8.106.99-1.064 2.374-1.672 3.827-1.681z"
              />
            </svg>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="'/add-recipe'">
            <svg
              id="Add_recipe"
              data-name="Add recipe"
              xmlns="http://www.w3.org/2000/svg"
              width="21.463"
              height="21.463"
              viewBox="0 0 21.463 21.463"
            >
              <g
                id="Group_21"
                data-name="Group 21"
                transform="translate(5.199 5.199)"
                style="isolation: isolate"
              >
                <g
                  id="Group_20"
                  data-name="Group 20"
                  transform="translate(0 0)"
                >
                  <g id="Group_19" data-name="Group 19">
                    <g id="Group_18" data-name="Group 18">
                      <path
                        id="Path_8"
                        data-name="Path 8"
                        d="M37.358,31.944H32.885V27.471a.471.471,0,1,0-.942,0v4.473H27.471a.471.471,0,1,0,0,.942h4.473v4.473a.471.471,0,0,0,.942,0V32.885h4.473a.471.471,0,0,0,0-.942Z"
                        transform="translate(-26.882 -26.882)"
                        fill-rule="evenodd"
                      />
                      <path
                        id="Path_9"
                        data-name="Path 9"
                        d="M32.032,37.565a.589.589,0,0,1-.589-.589V32.621H27.089a.589.589,0,0,1,0-1.177h4.355V27.089a.589.589,0,0,1,1.177,0v4.355h4.355a.589.589,0,1,1,0,1.177H32.621v4.355A.589.589,0,0,1,32.032,37.565Zm-4.944-5.885a.353.353,0,0,0,0,.706h4.591v4.591a.353.353,0,0,0,.706,0V32.385h4.591a.353.353,0,0,0,0-.706H32.385V27.089a.353.353,0,0,0-.706,0v4.591Z"
                        transform="translate(-26.5 -26.5)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g id="Group_25" data-name="Group 25" style="isolation: isolate">
                <g id="Group_24" data-name="Group 24">
                  <g id="Group_23" data-name="Group 23">
                    <g id="Group_22" data-name="Group 22">
                      <path
                        id="Path_10"
                        data-name="Path 10"
                        d="M15.147,25.878A10.732,10.732,0,1,1,25.878,15.147,10.744,10.744,0,0,1,15.147,25.878Zm0-20.286A9.555,9.555,0,1,0,24.7,15.147,9.566,9.566,0,0,0,15.147,5.592Z"
                        transform="translate(-4.415 -4.415)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </nuxt-link>
        </li>

        <li class="nav-item">
          <nuxt-link :to="'/admin'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22.304"
              height="22.304"
              xmlns:v="https://vecta.io/nano"
            >
              <circle cx="7.408" cy="8.002" r="1.149" />
              <circle
                cx="11.152"
                cy="11.152"
                r="10.502"
                stroke-width="1.3"
                stroke="#000"
                stroke-linejoin="round"
                fill="none"
              />
              <circle cx="14.794" cy="8.002" r="1.149" />
              <path
                d="M15.338 12.44c0 1.11-.441 2.175-1.226 2.96s-1.85 1.226-2.96 1.226-2.175-.441-2.96-1.226-1.226-1.85-1.226-2.96"
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
              />
            </svg>
          </nuxt-link>
        </li>
      </ul>
      <div class="header-search">
        <RecipeSearch />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeSearch from "@/components/UI/RecipeSearch";

export default {
  components: {
    RecipeSearch
  },
  props: ["title"],
  data() {
    return {
      scrolled: false
    };
  },
  methods: {
    handleScroll() {
      window.scrollY > 50 ? (this.scrolled = true) : (this.scrolled = false);
    }
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
    .header-title {
      font-size: 25px;
      &:before {
        content: "";
        width: 100px;
      }
    }
    .btn-add {
      width: 40px;
      height: 40px;
      right: -60px;
      top: 4px;
      svg {
        width: 20px;
        height: 20px;
        padding: 3px;
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
      padding-right: 60px;
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
