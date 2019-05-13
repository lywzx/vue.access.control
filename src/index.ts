import { installFn } from './install';
import { Vue } from "vue-property-decorator";

let vue: Vue;

const install = function(_Vue: Vue) {
    if (Vue && vue === _Vue) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
            '[vue.access.control] already installed. Vue.use(VueAccessControl) should be called only once.'
            )
        }
        return
    }
    vue = _Vue;
    installFn(vue);
}

export default {
    install
};