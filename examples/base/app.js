import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import access from "./access/index";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

new Vue({
  access,
  el: "#app",
  render: h => h(App)
});
