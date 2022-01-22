<template>
  <div class="search-page">
    <RecipeSearch @search-text="searchText" />
    <!-- <transition-group name="list-animation"> -->
    <Recipe
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.id"
      :photo="recipe.photo"
      :title="recipe.title"
      :liked="recipe.liked"
    />
    <!-- </transition-group> -->
    <!-- <p class="noJokes" v-if="jokes == 'noJokes'">
      There is no jokes matching this term
    </p>-->
    <!-- <div class="lds-roller" :busy="isBussy" v-if="isBussy">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>-->
  </div>
</template>

<script>
import axios from "axios";
import Recipe from "@/components/UI/Recipe";
import RecipeSearch from "@/components/UI/RecipeSearch";
const url = "https://recipes-6f5e0.firebaseio.com/recipes.json";

export default {
  components: {
    Recipe,
    RecipeSearch
  },
  data() {
    return {
      recipes: [],
      test: [],
      isBussy: true
    };
  },
  props: {
    id: {
      required: false
    },
    title: {
      required: false
    },
    liked: {
      type: Boolean,
      required: false
    },
    photo: {
      required: false
    },
    time: {
      required: false
    },
    author: {
      required: false
    },
    portions: {
      required: false
    },
    recipe: {
      required: false
    },
    ingredients: {
      required: false
    }
  },
  methods: {
    searchText(text) {
      if (text.length > 2) {
        this.recipes = null;
        return axios
          .get(url)
          .then(res => {
            var re = new RegExp(text, "gi");
            let arr = Object.entries(res.data).filter(a =>
              a[1].ingredients.find(b => b.ingredient.toLowerCase().match(re))
            );
            this.recipes = [arr[0][1]];
          })
          .catch(e => console.log(e));
      }
    }
  }
};
</script>

<style lang="scss">
.search-page {
  padding: 15px 10% 100px 10%;
  position: relative;
  @media (max-width: 450px) {
    /* background: url("~assets/img/bg.png") no-repeat top; */
  }
}
.list-animation-enter,
.list-animation-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-animation-leave-active {
  position: absolute;
  width: 100%;
}
@media screen and (max-width: 800px) {
  .list-animation-leave-active {
    width: 800vw;
  }
}

/* loader */
.lds-roller {
  margin: 0 auto;
  transform: scale(0.6);
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgb(155, 179, 223);
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
