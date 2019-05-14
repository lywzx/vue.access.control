import * as directives from './directives/index';
import { Vue as VueConstructor } from "vue-property-decorator";
import {
  each
} from 'lodash';

export const installFn = function (Vue: typeof VueConstructor) {

  // registry directives
  each(directives, function (value, name) {
    Vue.directive(name, value);
  });
};
