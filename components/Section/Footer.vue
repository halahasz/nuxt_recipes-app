<template>
  <div class="footer">
    <p>Copyright © Halina Bałys 2022</p>
    <p>Designed and coded by Halina Bałys</p>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixins";

.footer {
  padding: 0 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $max-container-width;
  width: 100%;
  position: absolute;
  bottom: -70px;
  margin: 0 auto;
  left: 0;
  right: 0;
  @include mQuery(mobile) {
    padding: 0 30px 30px;
    flex-direction: row;
    justify-content: space-between;
  }
  p {
    padding-top: 5px;
  }
}
.recipe-page + .footer {
  p {
    color: #fff;
  }
}
</style>
