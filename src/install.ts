import * as directives from './directives/index';
import * as components from './components/index';
import { Vue as VueConstructor } from 'vue-property-decorator';
import each from 'lodash-es/each';
import extend from 'lodash-es/extend';
import { assert } from './util';

export const installFn = function(Vue: typeof VueConstructor) {
  // registry directives
  each(directives, function(value, name) {
    Vue.directive(name, value);
  });

  // registry components
  each(components, function(value, name: string) {
    if (name === 'AccessRouterLink') {
      let routerLink = Vue.component('RouterLink') || Vue.component('router-link');
      // @ts-ignore
      assert(routerLink as boolean, 'please call method Vue.use(VueRouter) before Vue.use(VueAccessControl)');
      value = extend(value, {
        extends: routerLink,
      });
    }
    Vue.component(name, value);
  });
};
