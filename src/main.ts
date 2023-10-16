import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import userStore from "./stores/userStore";

new Vue({
  router,
  store: userStore,
  render: (h) => h(App),
}).$mount("#app");
