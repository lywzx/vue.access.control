import { Vue as VueConstructor } from "vue-property-decorator";
import { installFn } from './install';
import { assert } from "./util";
import {
  extend
} from 'lodash';
import AccessOptions from './types/AccessOptions';
import AccessUserOptions from './types/AccessUserOptions';
import ApplyMixin from './mixin';

let Vue: typeof VueConstructor;

export class Access {

  /**
   *
   */
  public _vm: VueConstructor | null;

  /**
   *
   */
  protected options: AccessOptions;

  /**
   * default Access config
   * @type AccessOptions
   */
  static defaultOptions: AccessOptions = {
    foreignKeyName: 'user_id',
    notLoginRoleName: 'Guest'
  };
  /**
   *
   */
  public accessUserOptions: AccessUserOptions | null;

  /**
   *
   * @param {{}} options
   */
  public constructor(options: Partial<AccessOptions> = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    let g = <Partial<{ Vue: typeof VueConstructor }>> global;
    if (!Vue && typeof g !== 'undefined' && g.Vue) {
      install(g.Vue);
    }

    if (process.env.NODE_ENV !== 'production') {
      assert(!!Vue, `must call Vue.use(VueAccessControl) before creating a Access instance.`);
    }

    // set config
    const {
      notLoginRoleName
    } = this.options = extend({}, Access.defaultOptions, options);
    // create default _userInfo
    this.accessUserOptions = <AccessUserOptions> extend(Object.create(null), {
      'roles': [
        {
          'role': notLoginRoleName
        }
      ],
      'permissions': [],
      'user_id': undefined
    });
    this._vm = resetUserInfoVm(this, this.accessUserOptions);
  }
}

function resetUserInfoVm(access: Access, accessUser: AccessUserOptions): VueConstructor {
  return new VueConstructor({
    data: {
      $$access: accessUser
    }
  });
}


export const install = function (_Vue: typeof VueConstructor,) {
  if (Vue && Vue === _Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vue.access.control] already installed. Vue.use(VueAccessControl) should be called only once.'
      );
    }
    return;
  }
  Vue = _Vue;
  ApplyMixin(Vue);
  installFn(Vue);
};
