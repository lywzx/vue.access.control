import Vue from "vue";
import router from "./router/index";
import App from "./App.vue";
import access from "./access/index";

const app = new Vue({
  access,
  render: h => h(App),
  router
}).$mount("#app");
