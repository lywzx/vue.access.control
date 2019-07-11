import { Vue as VueConstructor } from 'vue-property-decorator';

export default function(Vue: typeof VueConstructor) {
  const version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: accessInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init;
    Vue.prototype._init = function(options: any = {}) {
      options.init = options.init ? [accessInit].concat(options.init) : accessInit;
      _init.call(this, options);
    };
  }

  function accessInit(this: VueConstructor) {
    const options = this.$options as any;
    if (options.access) {
      this.$access = typeof options.access === 'function' ? options.access() : options.access;
    } else if (options.parent && options.parent.$access) {
      this.$access = options.parent.$access;
    }
  }
}
