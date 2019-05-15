import Vue from 'vue';
import router from './router/index';
import App from './App.vue';

const app = new Vue({
    render: (h) => h(App),
    router
}).$mount('#app');