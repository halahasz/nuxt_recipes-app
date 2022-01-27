<template>
  <div class="recipe-page">
    <div
      class="recipe-photo"
      :style="{
        'background-image': `url(${loadedRecipe.photo ||
          require(`@/assets/img/food-placeholder-${loadedRecipe.title.length %
            5}.jpg`)})`
      }"
    >
      <div class="recipe-photo__content">
        <h1 class="recipe-photo__title">{{ loadedRecipe.title }}</h1>
        <div class="recipe-photo__details">
          <div class="recipe-photo__details--data">
            <p>
              <span>On</span>
              {{ loadedRecipe.date }}
            </p>
            <p>
              <span>By</span>
              {{ loadedRecipe.author }}
            </p>
          </div>
          <div class="recipe-photo__details--links">
            <a
              v-if="loadedRecipe.link"
              :href="loadedRecipe.link"
              target="_blank"
              >Link</a
            >
            <FilledHeartIcon
              v-if="loadedRecipe.liked"
              @click.native.prevent="onSubmitted"
            />
            <EmptyHeartIcon v-else @click.native.prevent="onSubmitted" />
            <button @click="$router.push('/edit-recipe/' + $route.params.id)">
              <EditIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
    <section class="recipe-content">
      <div class="recipe-content__headlines">
        <button :class="{ 'button-active': isActive }" @click="isActive = true">
          Ingredients
        </button>
        <button
          :class="{ 'button-active': !isActive }"
          @click="isActive = false"
        >
          Recipe
        </button>
      </div>
      <transition-group name="switch-group">
        <section
          key="1"
          v-if="isActive"
          :class="['recipe-content__ingredients', { active: isActive }]"
        >
          <div class="recipe-content__ingredients-header">
            <div class="recipe-content__ingredients-clock">
              <ClockIcon />
              <p>{{ loadedRecipe.time }}</p>
            </div>
            <p>{{ loadedRecipe.portions }} portions</p>
          </div>
          <div
            class="recipe-content__ingredients-ingredient"
            v-for="(ingredient, index) in loadedRecipe.ingredients"
            :key="`${ingredient.ingredient}-${index}`"
          >
            <p
              class="recipe-content__ingredients-ingredient-el"
              @click="onClick"
            >
              {{ ingredient.ingredient }}
            </p>
            <p>{{ ingredient.amount }}</p>
          </div>
        </section>
        <section
          key="2"
          v-if="!isActive"
          :class="['recipe-content__recipe', { active: !isActive }]"
        >
          <div v-html="loadedRecipe.recipe.replace(/\n/g, '<br />')"></div>
        </section>
      </transition-group>
    </section>
  </div>
</template>

<script>
import FilledHeartIcon from "@/components/UI/Icons/FilledHeart";
import EmptyHeartIcon from "@/components/UI/Icons/EmptyHeart";
import EditIcon from "@/components/UI/Icons/EditIcon";
import ClockIcon from "@/components/UI/Icons/ClockIcon";

export default {
  components: {
    FilledHeartIcon,
    EmptyHeartIcon,
    EditIcon,
    ClockIcon
  },
  data() {
    return {
      isActive: true
    };
  },
  async asyncData({ store, params }) {
    const recipe = await store.dispatch("loadRecipe", params.id);
    return {
      loadedRecipe: recipe
    };
  },
  methods: {
    onSubmitted() {
      this.loadedRecipe.liked = !this.loadedRecipe.liked;

      // Save liked recipes in cookies
      if (this.loadedRecipe.liked) {
        if (!this.$cookies.get("likedRecipes")) {
          const arr = [];
          arr.push(this.loadedRecipe.id);
          this.$cookies.set("likedRecipes", arr, {
            maxAge: 60 * 60 * 24 * 7
          });
        } else {
          const arr = this.$cookies.get("likedRecipes");
          arr.push(this.loadedRecipe.id);
          this.$cookies.remove("likedRecipes");
          this.$cookies.set("likedRecipes", arr, {
            maxAge: 60 * 60 * 24 * 7
          });
        }
      } else {
        if (!this.$cookies.get("likedRecipes")) {
          return;
        } else {
          const arr = this.$cookies.get("likedRecipes");
          const filteredArr = arr.filter(el => el != this.loadedRecipe.id);
          this.$cookies.remove("likedRecipes");
          this.$cookies.set("likedRecipes", filteredArr, {
            maxAge: 60 * 60 * 24 * 7
          });
        }
      }
      if (this.$cookies.get("token")) {
        this.$store.dispatch("editRecipe", this.loadedRecipe);
      }
    },
    onClick(e) {
      e.target.classList.toggle("ingredient-checked");
    }
  }
};
</script>
