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
        style="display: none"
        accept="image/*"
        @change="onFilePicked"
      />
    </div>
    <AppInput label="Title" bold required v-model="editedRecipe.title" />
    <AppInput label="Author" v-model="editedRecipe.author" />
    <AppInput label="Link" v-model="editedRecipe.link" />
    <div class="form-group">
      <AppInput label="Time" v-model="editedRecipe.time" />
      <AppInput
        label="Portions"
        type="number"
        v-model="editedRecipe.portions"
      />
    </div>
    <p class="form__label">INGREDIENTS</p>
    <div class="form-ingredients" v-if="editedRecipe.ingredients.length">
      <transition-group tag="div" name="fade-ingredients">
        <div
          v-for="(ingr, index) in editedRecipe.ingredients"
          :key="`${ingr.ingredient}-${index}`"
          class="form-ingredients__ingredient"
        >
          <div>
            <AppInput
              :label="'Ingredient ' + (index + 1)"
              v-model.trim="ingr.ingredient"
              :key="index"
            />
            <AppInput
              class="amount"
              label="Amount"
              v-model.trim="ingr.amount"
            />
            <AppButton
              text="-"
              v-if="editedRecipe.ingredients.length > 1"
              look="minus"
              color="white"
              @click="removeIngr(index)"
            />
          </div>
        </div>
        <AppButton
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
      <AppButton text="Save" type="submit" />
      <AppButton text="Remove" color="red" @click="onRemove" />
      <AppButton text="Cancel" color="white" @click="onCancel" />
    </div>
  </form>
</template>

<script>
import { firebaseConfig } from "@/store/firebase";
import { firebaseAuthConfig } from "@/store/firebase-auth";
import { mapGetters } from "vuex";
import firebase from "firebase";
import AppInput from "@/components/UI/AppInput";
import AppButton from "@/components/UI/AppButton";
import CameraIcon from "@/components/UI/Icons/CameraIcon";

export default {
  name: "AdminPostForm",
  components: {
    AppInput,
    AppButton,
    CameraIcon,
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
            }`,
          },
    };
  },
  computed: {
    ...mapGetters({ isAdmin: "auth/isAdmin" }),
  },
  props: {
    recipe: {
      type: Object,
      required: false,
    },
  },
  methods: {
    onSave() {
      const filteredIngredients = this.editedRecipe.ingredients.filter(
        (ingr) => ingr.ingredient !== ""
      );
      if (filteredIngredients.length) {
        this.editedRecipe.ingredients = filteredIngredients;
      }
      this.$emit("submit", this.editedRecipe);
    },
    onRemove() {
      this.$emit("del-recipe", this.editedRecipe);
    },
    removeIngr(index) {
      this.editedRecipe.ingredients.splice(index, 1);
    },
    onCancel() {
      if (this.recipe) {
        this.$router.push("/recipes/" + this.$route.params.editId);
      } else {
        this.$router.push("/");
      }
    },
    addIngr() {
      const newIngr = {
        id: this.editedRecipe.ingredients.length,
        ingredient: "",
        amount: "",
      };
      this.editedRecipe.ingredients.push(newIngr);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(e) {
      let fb;
      if (this.isAdmin) {
        fb = firebase.initializeApp(firebaseAuthConfig);
      } else {
        fb = firebase.initializeApp(firebaseConfig);
      }
      const files = e.target.files;
      if (files[0]) {
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

        uploadTask.on("state_changed", (snapshot) => {
          uploadTask.snapshot.ref.getDownloadURL().then((getDownloadURL) => {
            this.editedRecipe.photo = getDownloadURL;
          });
        });
        fb.delete();
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.form {
  width: 100%;
  padding: 0px 15px 0;
  @include mQuery(sm-tablet) {
    padding: 0px 30px 0;
    width: 80%;
    margin-left: 10%;
  }
  @include mQuery(tablet) {
    width: 70%;
    margin-left: 15%;
  }
  @include mQuery(desktop) {
    width: 60%;
    margin-left: 20%;
  }
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
    font-weight: 600;
    font-size: 15px;
    font-size: 1.4rem;
    height: 180px;
    width: 100%;
    line-height: 21px;
    padding: 0 10px;
    border-color: $grey;
    border: none;
    font-family: "Open Sans", sans-serif;
    border: none;
    border-bottom: 1px solid $grey;
    border-radius: 0;
    font-weight: 400;
    padding: 1;
    @include mQuery(desktop) {
      padding: 0 15px;
    }
    &:focus {
      outline: none;
      border: none;
      border-bottom: 1px solid $primary;
    }
    &::placeholder {
      font-family: "Open Sans", sans-serif;
      color: $grey;
      font-size: 1.3rem;
      font-weight: 400;
      @include mQuery(desktop) {
        font-size: 1.4rem;
      }
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
    margin: 30px 0px 10px 0;
    position: relative;
    @include mQuery(mobile) {
      margin: 30px 0px 20px 0;
    }
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
  margin-bottom: 60px;
  .input {
    width: 48%;
    margin: 0;
  }
}
.form-ingredients {
  margin-bottom: 90px;
  @include mQuery(mobile) {
    margin-bottom: 60px;
  }
  .btn {
    transition: $transition;
  }
  &__ingredient {
    transition: $transition;
    div {
      display: flex;
      justify-content: space-between;
      position: relative;
      .input {
        margin: 10px 0;
        width: 71%;
        &.amount {
          width: 25%;
        }
      }
    }
  }
  .btn {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 153px;
  }
}
.form-btns {
  max-width: 350px;
  margin: 30px auto;
  display: flex;
  justify-content: space-around;
}
</style>
