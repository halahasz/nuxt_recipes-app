<template>
  <ul class="nav">
    <li class="nav-item_1">
      <nuxt-link :to="'/'" exact />
    </li>
    <li class="nav-item_2">
      <nuxt-link :to="'/favourites'" />
    </li>
    <li class="nav-item_3">
      <nuxt-link :to="'/add-recipe'" />
    </li>
    <li class="nav-item_4">
      <nuxt-link :to="'/search'" />
    </li>
    <li class="nav-item_5">
      <nuxt-link :to="'/admin'" />
    </li>
  </ul>
</template>

<style lang="scss">
.nav {
  height: 60px;
  display: flex;
  list-style: none;
  position: fixed;
  bottom: 0;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-left: 0;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0px 3px 5px -1px rgba(158, 116, 88, 0.35),
    0px 6px 10px 0px rgba(158, 116, 88, 0.25),
    0px 1px 18px 0px rgba(158, 116, 88, 0.25);
  a {
    display: block;
    height: 60px;
    width: 60px;
  }
}
.nav-item_1 {
  a {
    /* background: url("~assets/img/home_black.svg") no-repeat center; */
  }
  a.nuxt-link-active {
    /* background: url("~assets/img/home_active.svg") no-repeat center; */
  }
}
.nav-item_2 {
  a {
    /* background: url("~assets/img/heart_black.svg") no-repeat center; */
  }
  a.nuxt-link-active {
    /* background: url("~assets/img/heart_active.svg") no-repeat center; */
  }
}
.nav-item_3 {
  a {
    /* background: url("~assets/img/add_black.svg") no-repeat center; */
  }
  a.nuxt-link-active {
    /* background: url("~assets/img/add_active.svg") no-repeat center; */
  }
}
.nav-item_4 {
  a {
    background: url("~assets/img/search_black.svg") no-repeat center;
  }
  a.nuxt-link-active {
    background: url("~assets/img/search_active.svg") no-repeat center;
  }
}
.nav-item_5 {
  a {
    background: url("~assets/img/settings_black.svg") no-repeat center;
  }
  a.nuxt-link-active {
    background: url("~assets/img/settings_active.svg") no-repeat center;
  }
}
</style>
