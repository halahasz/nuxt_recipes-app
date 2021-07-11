export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "My Recipes",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    // script: [
    //   { src: "https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js" }
    // ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap&subset=latin-ext"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fa6a18;", duration: 3000 },
  /*
   ** Global CSS
   */
  css: ["@/assets/styles/styles.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@layer0/nuxt/module"],
  modules: [],
  /*
   ** Nuxt.js modules
   */
  // modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  // proxy: {
  //   "/recipes.json": {
  //     target: "https://recipes-app-2d021.firebaseio.com",
  //     pathRewrite: {
  //       "^/recipes.json": "/"
  //     }
  //   }
  // },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  generate: {
    fallback: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
