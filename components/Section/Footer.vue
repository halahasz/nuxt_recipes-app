<template>
  <div class="footer">
    <p>Copyright © Halina Bałys 2022</p>
    <p>Designed and coded by Halina Bałys</p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables";

.footer {
  padding: 0 15px 30px;
  display: flex;
  justify-content: space-between;
  max-width: $max-container-width;
  width: 100%;
  position: absolute;
  bottom: -70px;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.recipe-page + .footer {
  p {
    color: #fff;
  }
}
</style>
