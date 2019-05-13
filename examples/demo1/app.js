import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import VueAccessControl from 'vue.access.control';

Vue.use(VueAccessControl);

new Vue({
  el: '#app',
  render: h => h(App)
})
