<template>
  <form class="form" @submit.prevent="onSave">
    <div class="form-photo">
      <img class="form-photo__thumbnail" :src="editedRecipe.photo" />
      <button
        title="Pick a file"
        type="button"
        :class="['form-photo__btn', { right: editedRecipe.photo }]"
        @click="onPickFile"
      >
        <CameraIcon />
      </button>
      <input
        type="file"
        ref="fileInput"
        style="display: none;"
        accept="image/*"
        @change="onFilePicked"
      />
    </div>
    <Input label="Title" bold required v-model="editedRecipe.title" />
    <Input label="Author" v-model="editedRecipe.author" />
    <Input label="Link" v-model="editedRecipe.link" />
    <div class="form-group">
      <Input label="Time" v-model="editedRecipe.time" />
      <Input label="Portions" type="number" v-model="editedRecipe.portions" />
    </div>
    <p class="form__label">INGREDIENTS</p>
    <div class="form-ingredients" v-if="editedRecipe.ingredients.length">
      <transition-group tag="div" name="fade-ingredients">
        <div
          v-for="(ingr, index) in editedRecipe.ingredients"
          :key="`${ingr.product}-${index}`"
          class="form-ingredients__ingredient"
        >
          <div>
            <!-- TODO: fix input transition bug -->
            <Input
              :label="'Ingredient ' + (index + 1)"
              v-model="ingr.product"
              :key="ingr.id"
            />
            <Input class="amount" label="Amount" v-model.trim="ingr.amount" />
            <button
              type="button"
              v-if="editedRecipe.ingredients.length > 1"
              class="form-ingredients__btn"
              @click="removeIngr(index)"
            >
              -
            </button>
          </div>
        </div>
        <Button
          v-if="editedRecipe.ingredients.length < 10"
          text="+ Add ingredient"
          color="white"
          @click="addIngr"
          :key="'btn'"
        />
      </transition-group>
    </div>
    <p class="form__label">RECIPE</p>
    <textarea
      class="form__textarea"
      name="input-7-1"
      v-model="editedRecipe.recipe"
      cols="30"
      rows="10"
      placeholder="Type your recipe..."
    ></textarea>
    <div class="form-btns">
      <Button text="Save" type="submit" />
      <Button text="Remove" color="red" @click="onRemove" />
      <Button text="Cancel" color="white" @click="onCancel" />
    </div>
  </form>
</template>

<script>
import { firebaseConfig } from "@/store/firebase";
import firebase from "firebase";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import CameraIcon from "@/components/UI/Icons/CameraIcon";

export default {
  name: "AdminPostForm",
  components: {
    Input,
    Button,
    CameraIcon
  },
  data() {
    return {
      editedRecipe: this.recipe
        ? { ...this.recipe, id: this.$route.params.editId }
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
    recipe: {
      type: Object,
      required: false
    }
  },
  methods: {
    onSave() {
      this.$emit("submit", this.editedRecipe);
    },
    onRemove() {
      this.$emit("del-recipe", this.editedRecipe);
    },
    removeIngr(index) {
      this.editedRecipe.ingredients.splice(index, 1);
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
      const fb = firebase.initializeApp(firebaseConfig);
      const files = e.target.files;
      console.log(files);
      if (files[0]) {
        let fileName = files[0].name;
        if (fileName.lastIndexOf(".") <= 0) {
          return alert("Please add a valid file!");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.editedRecipe.photo = fileReader.result;
        });
        console.log(this.editedRecipe.photo);
        fileReader.readAsDataURL(files[0]);

        let file = e.target.files[0];

        var storageRef = fb.storage().ref("edit-recipe/" + file.name);
        let uploadTask = storageRef.put(file);

        uploadTask.on("state_changed", snapshot => {
          uploadTask.snapshot.ref.getDownloadURL().then(getDownloadURL => {
            this.editedRecipe.photo = getDownloadURL;
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.form {
  width: 60%;
  padding: 0px 30px 0;
  margin-left: 20%;
  &__label {
    margin-bottom: 20px;
    margin-top: 40px;
    font-weight: bold;
    font-size: 1.6rem;
  }
  &__textarea {
    background-color: transparent;
    resize: vertical;
    color: $accent;
    margin-top: 10px;
    font-weight: 600;
    font-size: 15px;
    font-size: 1.4rem;
    height: 180px;
    width: 100%;
    line-height: 21px;
    padding: 15px;
    border-color: $grey;
    font-family: "Open Sans", sans-serif;
    border: none;
    border-bottom: 1px solid $grey;
    font-weight: 400;
    &:focus {
      outline: none;
      border: none;
      border-bottom: 1px solid $primary;
    }
    &::placeholder {
      font-family: "Open Sans", sans-serif;
      color: $grey;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
}
.form-photo {
  position: relative;
  text-align: center;
  &__thumbnail {
    max-width: 200px;
    max-height: 300px;
    border-radius: 30px;
    margin: 30px 0px 20px 0;
    position: relative;
  }
  &__btn {
    position: absolute;
    content: "";
    top: 0;
    background: #fff;
    right: calc(50% - 28px);
    width: 50px;
    height: 50px;
    border-radius: 30px;
    transition: $transition;
    box-shadow: $box-shadow;
    cursor: pointer;
    &.right {
      right: 40%;
    }
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
      height: 25px;
      transition: $transition;
      path,
      circle {
        transition: $transition;
      }
    }
  }
}
.form-group {
  display: flex;
  justify-content: space-between;
  .input {
    width: 48%;
    margin: 0;
  }
}
.form-ingredients {
  .btn {
    transition: $transition;
  }
  &__ingredient {
    transition: $transition;
    div {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin: 20px auto;
      .input {
        width: 71%;
        margin: 0;
        &.amount {
          width: 25%;
        }
      }
    }
  }
  &__btn {
    font-size: 2.2rem;
    cursor: pointer;
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
  .btn {
    margin-top: 30px;
  }
}
.form-btns {
  max-width: 350px;
  margin: 30px auto;
  display: flex;
  justify-content: space-around;
}
</style>
