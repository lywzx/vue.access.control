import { installFn } from './install';

let Vue;
export const install = function(_Vue) {
    if (Vue && _Vue === Vue) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
            '[vue.access.control] already installed. Vue.use(VueAccessControl) should be called only once.'
            )
        }
        return
    }
    Vue = _Vue;
    installFn(Vue);
}