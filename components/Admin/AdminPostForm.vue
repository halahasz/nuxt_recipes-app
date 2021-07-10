<template>
  <form class="recipe-form" @submit.prevent="onSave">
    <div class="add-recipe-container">
      <!-- <img class="recipe-thumbnail" :src="editedRecipe.photo" /> -->
      <v-btn color="#fff" class="btn-add" fab @click="onPickFile">
        <!-- <img class="add-icon" src="~assets/img/add.svg" alt /> -->
      </v-btn>
      <input
        class="add-input"
        type="file"
        ref="fileInput"
        style="display: none;"
        accept="image/*"
        @change="onFilePicked"
      />
    </div>
    <v-text-field
      v-model="editedRecipe.title"
      :value="editedRecipe.title"
      label="Title"
      color="#fa6a18"
    ></v-text-field>
    <v-text-field
      color="#fa6a18"
      background-color="fa6a18"
      v-model="editedRecipe.author"
      label="Author"
    ></v-text-field>
    <v-text-field
      class="recipe-link"
      v-model="editedRecipe.link"
      label="Link"
      color="#fa6a18"
    ></v-text-field>
    <div class="recipe-link-container">
      <v-text-field
        class="recipe-time"
        v-model="editedRecipe.time"
        label="Time"
        color="#fa6a18"
      ></v-text-field>
      <v-text-field
        v-model="editedRecipe.portions"
        label="Portions"
        color="#fa6a18"
      ></v-text-field>
    </div>
    <p class="ingredients-label">INGREDIENTS</p>
    <template v-if="editedRecipe.ingredients">
      <div
        class="recipe-ingredient-container"
        v-for="(ingredient, index) in editedRecipe.ingredients"
        :key="index"
      >
        <v-text-field
          color="#fa6a18"
          class="recipe-ingredient"
          v-model="ingredient.ingredient"
          :label="'Ingredient ' + (index + 1)"
        ></v-text-field>
        <v-btn
          v-if="editedRecipe.ingredients.length > 1"
          class="btn-rmIngr"
          color="#fff"
          @click="removeIngr(index)"
          rounded
          >-</v-btn
        >
        <v-text-field
          class="recipe-amount"
          color="#fa6a18"
          v-model="ingredient.amount"
          :label="'Amount ' + (index + 1)"
        ></v-text-field>
      </div>
    </template>
    <v-btn class="btn-ingr" @click="addIngr" rounded color="#fff"
      >+ Add ingredient</v-btn
    >
    <v-textarea
      color="#fa6a18"
      class="recipe-textarea"
      name="input-7-1"
      v-model="editedRecipe.recipe"
      label="Recipe"
      value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    ></v-textarea>
    <div class="add-recipe-container">
      <v-btn
        class="btn-save btn-custom ma-2"
        type="submit"
        rounded
        color="#fa6a18"
        >Save</v-btn
      >
      <v-btn
        class="btn-remove btn-custom ma-2"
        @click="onRemove"
        rounded
        color="rgb(223, 70, 36)"
        >Remove</v-btn
      >
      <v-btn
        class="btn-cancel btn-custom ma-2"
        @click.native="onCancel"
        rounded
        color="#fff"
        >Cancel</v-btn
      >
    </div>
  </form>
</template>

<script>
import { fb, db } from "@/store/firebase";
// import add from "@/assets/img/add.svg";

export default {
  name: "AdminPostForm",
  data() {
    return {
      editedRecipe: this.recipe
        ? { ...this.recipe }
        : {
            title: "",
            photo: "",
            id: this.$route.params.id,
            link: "",
            time: "",
            author: "",
            portions: "",
            recipe: "",
            ingredients: [{ id: 0, ingredient: "", amount: "" }],
            liked: false,
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
      //Navigate back
      this.$emit("del-recipe", this.editedRecipe);
    },
    removeIngr(index) {
      const rmIngr = this.editedRecipe.ingredients.splice(index, 1).id;
      this.$emit("del-ingr", rmIngr);
    },
    onCancel() {
      //Navigate back
      this.$router.push("/recipes/" + this.$route.params.editId);
    },
    addIngr() {
      let counter = 0;
      const newIngr = {
        id: this.editedRecipe.ingredients.length,
        ingredient: this.editedRecipe.ingredient,
        amount: this.editedRecipe.amount
      };
      this.editedRecipe.ingredients.push(newIngr);
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
      var storageRef = fb.storage().ref("recipes/" + file.name);
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
.recipe-form {
  width: 60%;
  margin: 0px 30px 120px;
  margin-left: 20%;
  @media (max-width: 1000px) {
    width: calc(100% - 60px);
    margin: 0px 30px 120px;
  }
}
.theme--light.v-input {
  color: #fa6a18;
}
label.theme--light.v-label {
  &--active {
    color: #ec9969;
  }
}
.add-icon {
  width: 30px;
}

.recipe-thumbnail {
  max-width: 150px;
  border-radius: 30px;
  margin: 30px 50px 20px 0;
}
.add-recipe-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btns-container {
  display: flex;
  justify-content: space-around;
}
.v-btn.btn-cancel,
.v-btn.btn-cancel:active {
  .v-btn__content {
    color: rgb(104, 104, 104);
  }
}
.v-btn,
.v-btn:active,
.v-btn:focus {
  .v-btn__content {
    color: #fff;
  }
}
.theme--light.v-btn {
  color: #fff;
}
.btn-custom {
  margin: 8px;
}
.btn-add {
  margin: 40px 50px 20px 0;
  &:before {
    background-color: #fff;
  }
  &:active {
    background-color: #fff;
  }
}
.v-btn.btn-ingr {
  text-transform: none;
  span.v-btn__content {
    color: #fa6a18;
  }
}
.btn-rmIngr.v-btn.theme--light,
.btn-rmIngr.v-btn.v-size--default {
  font-size: 25px;
  height: 22px;
  position: absolute;
  right: 5px;
  top: -5px;
  z-index: 10;
  padding: 0 5px 7px 5px;
  span.v-btn__content {
    color: rgb(223, 70, 36);
    line-height: 28px;
  }
}
.v-text-field {
  padding-top: 0;
}
.recipe-ingredient-container {
  display: flex;
  position: relative;
}
.recipe-link-container {
  display: flex;
  margin-bottom: 30px;
}
.recipe-ingredient,
.recipe-link {
  flex-basis: 60%;
}
.recipe-ingredient,
.recipe-time {
  margin-right: 7px;
}
.ingredients-label {
  margin-bottom: 20px;
  font-weight: bold;
}
.recipe-textarea {
  margin-top: 30px;
  textarea {
    font-weight: 600;
    font-size: 15px;
    height: 240px;
    line-height: 21px;
    padding: 15px 10px 10px;
  }
  label {
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
  }
}
.v-input {
  input {
    font-weight: 600;
    font-size: 15px;
    padding: 15px 10px 10px;
  }
  label {
    font-size: 13px;
  }
  &:active:before,
  &:focus:before {
    background-color: #fa6a18;
  }
  &__slot {
    width: 97%;
  }
}
</style>
