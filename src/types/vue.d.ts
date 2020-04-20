/**
 * Extends interfaces in Vue.js
 */

import Vue, { ComponentOptions } from 'vue';
import { Access } from '../Access';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    access?: Access;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $access: Access;
  }
}
