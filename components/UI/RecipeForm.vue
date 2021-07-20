<template>
  <form class="recipe-form" @submit.prevent="onSave">
    <div class="add-recipe-container">
      <img class="recipe-thumbnail" :src="editedRecipe.photo" />
      <button type="button" class="btn-add" @click="onPickFile">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 352.299 352.299"
          style="enable-background:new 0 0 352.299 352.299;"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M213.738,276.082c46.459,0,84.256-37.796,84.256-84.252c0-46.461-37.797-84.258-84.256-84.258
			s-84.258,37.797-84.258,84.258C129.48,238.286,167.279,276.082,213.738,276.082z M213.738,121.572
			c38.74,0,70.256,31.518,70.256,70.258c0,38.736-31.516,70.252-70.256,70.252c-38.74,0-70.258-31.516-70.258-70.252
			C143.48,153.09,174.998,121.572,213.738,121.572z"
              />
              <path
                d="M310.65,74.039h-13.719c-1.541-19.1-17.574-34.172-37.063-34.172h-92.264c-19.486,0-35.521,15.072-37.061,34.172h-14.32
			v-8.791c0-12.9-15.59-22.631-36.262-22.631s-36.26,9.73-36.26,22.631v8.791h-2.055C18.684,74.039,0,92.723,0,115.688v155.096
			c0,22.965,18.684,41.648,41.648,41.648H310.65c22.965,0,41.648-18.684,41.648-41.648V115.688
			C352.299,92.723,333.615,74.039,310.65,74.039z M14,115.688c0-15.245,12.402-27.648,27.648-27.648h96.066
			c2.018,0,3.936-0.869,5.266-2.387c1.328-1.518,1.939-3.535,1.672-5.535c-0.156-1.181-0.229-2.152-0.229-3.063
			c0-12.785,10.398-23.188,23.182-23.188h92.264c12.783,0,23.184,10.402,23.184,23.188c0,0.902-0.074,1.877-0.23,3.067
			c-0.266,1.999,0.346,4.015,1.676,5.532c1.328,1.516,3.246,2.385,5.264,2.385h20.889c15.246,0,27.648,12.403,27.648,27.648v155.096
			c0,15.246-12.402,27.648-27.648,27.648H41.648C26.402,298.432,14,286.029,14,270.783V115.688z M57.703,65.248
			c0-3.043,8.451-8.631,22.26-8.631c13.811,0,22.262,5.588,22.262,8.631v8.063H57.703V65.248z"
              />
              <path
                d="M54.771,283.793c12.621,0,22.887-10.268,22.887-22.89V130.445c0-12.62-10.266-22.887-22.887-22.887
			s-22.891,10.267-22.891,22.887v130.458C31.881,273.525,42.15,283.793,54.771,283.793z M45.881,130.445
			c0-4.9,3.988-8.887,8.891-8.887c4.9,0,8.887,3.986,8.887,8.887v130.458c0,4.901-3.986,8.89-8.887,8.89
			c-4.902,0-8.891-3.988-8.891-8.89V130.445z"
              />
              <path
                d="M213.738,252.651c33.537,0,60.82-27.284,60.82-60.821c0-33.541-27.283-60.826-60.82-60.826s-60.822,27.285-60.822,60.826
			C152.916,225.367,180.201,252.651,213.738,252.651z M213.738,145.004c25.816,0,46.82,21.006,46.82,46.826
			c0,25.816-21.004,46.821-46.82,46.821c-25.818,0-46.822-21.005-46.822-46.821C166.916,166.01,187.92,145.004,213.738,145.004z"
              />
              <path
                d="M306.178,142.227c12.512,0,22.691-10.179,22.691-22.692c0-12.512-10.18-22.691-22.691-22.691
			c-12.512,0-22.691,10.18-22.691,22.691C283.486,132.049,293.666,142.227,306.178,142.227z M306.178,110.844
			c4.793,0,8.691,3.899,8.691,8.691c0,4.793-3.898,8.692-8.691,8.692c-4.793,0-8.691-3.899-8.691-8.692
			C297.486,114.742,301.385,110.844,306.178,110.844z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </button>
      <input
        class="add-input"
        type="file"
        ref="fileInput"
        style="display: none;"
        accept="image/*"
        @change="onFilePicked"
      />
    </div>
    <Input label="Title" v-model="editedRecipe.title" />
    <Input label="Author" v-model="editedRecipe.author" />
    <Input label="Link" v-model="editedRecipe.link" />

    <div class="form__group-container">
      <Input label="Time" v-model="editedRecipe.time" />
      <Input label="Portions" type="number" v-model="editedRecipe.portions" />
    </div>
    <p class="ingredients-label">INGREDIENTS <span>(1-10)</span></p>
    <template v-if="editedRecipe.ingredients">
      <div
        class="recipe-ingredient-container"
        v-for="(ingredient, index) in editedRecipe.ingredients"
        :key="index"
      >
        <Input
          :label="'Ingredient ' + (index + 1)"
          v-model.trim="ingredient.ingredient"
        />
        <button
          type="button"
          v-if="editedRecipe.ingredients.length > 1"
          class="btn-rm"
          @click="removeIngr(index)"
        >
          -
        </button>
        <Input
          class="form__group--amount"
          :label="'Amount ' + (index + 1)"
          v-model.trim="ingredient.amount"
        />
      </div>
    </template>
    <button
      v-if="editedRecipe.ingredients.length < 10"
      type="button"
      class="btn-ingr btn-custom"
      @click="addIngr"
      rounded
      color="#fff"
    >
      + Add ingredient
    </button>
    <p class="ingredients-label">RECIPE</p>
    <textarea
      class="recipe-textarea"
      name="input-7-1"
      v-model="editedRecipe.recipe"
      cols="30"
      rows="10"
      placeholder="Type your recipe..."
    ></textarea>
    <div class="add-recipe-container">
      <button class="btn-save btn-custom" type="submit">Save</button>
      <button type="button" class="btn-remove btn-custom" @click="onRemove">
        Remove
      </button>
      <button type="button" class="btn-cancel btn-custom" @click="onCancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import { fb, db } from "@/store/firebase";
import Input from "@/components/UI/Input";

export default {
  name: "AdminPostForm",
  components: {
    Input
  },
  data() {
    return {
      editedRecipe: this.recipe
        ? { ...this.recipe }
        : {
            title: "",
            keywards: {},
            photo: "",
            id: this.$route.params.id,
            link: "",
            time: "",
            author: "",
            portions: "",
            recipe: "",
            ingredients: [{ id: 0, ingredient: "", amount: "" }],
            liked: false,
            order: -new Date().getTime(),
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1 < 10
                ? "0" + (new Date().getMonth() + 1)
                : new Date().getMonth()
            }-${
              new Date().getDate() < 10
                ? "0" + new Date().getDate()
                : new Date().getDate()
            }`
          }
    };
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: true
    },
    recipe: {
      type: Object
    }
  },
  methods: {
    onSave() {
      //Save the recipe
      this.$emit("submit", this.editedRecipe);
    },
    onRemove() {
      this.$emit("del-recipe", this.editedRecipe);
    },
    removeIngr(index) {
      const rmIngr = this.editedRecipe.ingredients.splice(index, 1).id;
      this.$emit("del-ingr", rmIngr);
    },
    onCancel() {
      this.$router.push("/recipes/" + this.$route.params.editId);
    },
    addIngr() {
      if (this.editedRecipe.ingredients.length < 10) {
        const newIngr = {
          id: this.editedRecipe.ingredients.length,
          ingredient: this.editedRecipe.ingredient
            ? this.editedRecipe.ingredient.toLowerCase()
            : null,
          amount: this.editedRecipe.amount
        };
        this.editedRecipe.ingredients.push(newIngr);
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(e) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.editedRecipe.photo = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);

      let file = e.target.files[0];
      var storageRef = fb.storage().ref("edit-recipe/" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on("state_changed", function(snapshot) {
        uploadTask.snapshot.ref.getDownloadURL().then(function(getDownloadURL) {
          this.editedRecipe.photo = getDownloadURL;
        });
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.recipe-form {
  width: 60%;
  padding: 0px 30px 120px;
  margin-left: 20%;
  @media (max-width: 1000px) {
    width: calc(100% - 60px);
    margin: 0px 30px 120px;
  }
}
.add-recipe-container {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.recipe-thumbnail {
  max-width: 200px;
  max-height: 300px;
  border-radius: 30px;
  margin: 30px 0px 20px 0;
  position: relative;
}
.btn-add {
  position: absolute;
  content: "";
  top: 0;
  background: #fff;
  right: calc(50% - 28px);
  width: 56px;
  height: 56px;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  box-shadow: $box-shadow;
  &:hover {
    box-shadow: $box-shadow-light;
    svg {
      path,
      circle {
        fill: #f60;
      }
    }
  }
  svg {
    width: 27px;
    height: 30px;
    path,
    circle {
      transition: all 0.3s ease-in-out;
    }
  }
}
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin: 17px auto 20px;
  width: 100%;
  background-color: transparent;
  &.title {
    .form__field {
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
  &-container {
    display: flex;
    justify-content: space-between;
    .form__group {
      width: 48%;
      margin: 0;
    }
  }
}
.ingredients-label {
  margin-bottom: 20px;
  margin-top: 40px;
  font-weight: bold;
  font-size: 1.6rem;
  span {
    font-weight: normal;
  }
}

.recipe-ingredient-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 17px auto 20px;
  .form__group {
    width: 77%;
    margin: 0;
    &--amount {
      width: 19%;
    }
  }
}
.btn-rm {
  font-size: 2.2rem;
  height: 22px;
  width: 22px;
  position: absolute;
  right: 5px;
  z-index: 10;
  border-radius: 10px;
  color: $primary;
  box-shadow: $box-shadow;
  line-height: 18px;
  background-color: $white;
  top: 8px;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: $box-shadow-light;
  }
}
.btn-ingr {
  text-transform: none;
  cursor: pointer;
  box-shadow: $box-shadow;
  color: $primary;
  padding: 0 16px;
  border-radius: 28px;
  height: 36px;
  margin-top: 20px;
  letter-spacing: 1px;
}
.recipe-textarea {
  background-color: transparent;
  resize: vertical;
  margin-top: 10px;
  font-weight: 600;
  font-size: 15px;
  font-size: 1.4rem;
  height: 240px;
  width: 100%;
  line-height: 21px;
  padding: 15px;
  border-color: $grey;
  font-family: "Open Sans", sans-serif;
  border: 1px solid $grey;
  font-weight: 100;
  &:focus {
    outline: 1px solid $primary;
    border: none;
  }
  &::placeholder {
    font-family: "Open Sans", sans-serif;
    color: $grey;
    font-size: 1.4rem;
    font-weight: 100;
  }
}
.btns-container {
  display: flex;
  justify-content: space-around;
}
button.btn-custom {
  text-transform: none;
  cursor: pointer;
  background-color: $white;
  box-shadow: $box-shadow;
  transition: all 0.3s ease-in-out;
  color: $primary;
  padding: 0 16px;
  padding-bottom: 2px;
  border-radius: 28px;
  height: 36px;
  margin-top: 20px;
  letter-spacing: 1px;
  margin-right: 15px;
  &:hover {
    box-shadow: $box-shadow-light;
  }
}
button.btn-remove {
  color: $white;
  background-color: $red;
  &:hover {
    background-color: $red-dark;
  }
}
button.btn-save {
  color: $white;
  background-color: $primary;
  &:hover {
    background-color: $primary-dark;
  }
}
button.btn-cancel {
  color: $grey;
}
</style>
