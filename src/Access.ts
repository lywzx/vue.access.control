import { Vue as VueConstructor } from "vue-property-decorator";
import { installFn } from './install';
import { assert } from "./util";
import {
  extend
} from 'lodash';
import AccessOptions from './types/AccessOptions';
import AccessUserOptions from './types/AccessUserOptions';
import ApplyMixin from './mixin';
import User from "@lywzx/access.control/dist/User";
import {
  AbilityOptions,
  MapKeyStringValueBoolean,
  RoleAndOwnsOptions, RoleTypes,
  StringOrStringArray
} from "@lywzx/access.control/dist/types/Types";
import { Post } from "@lywzx/access.control/dist/types/Post";
import { getRole, standardize } from "@lywzx/access.control/dist/Util";
import AccessConstructorOptions from "./types/AccessConstructorOptions";
import RouterMiddleware from "./router/RouterMiddleware";

let Vue: typeof VueConstructor;

export class Access {

  /**
   * a vue instance
   */
  public _vm: VueConstructor;

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
    notLoginRoleName: 'Guest',
    vueRouter: false
  };


  /**
   * user access info
   */
  public accessUserOptions: AccessUserOptions;

  /**
   * router middleware
   */
  public accessRouterMiddleware?: RouterMiddleware;

  public constructor(options: AccessConstructorOptions) {
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
    } = this.options = extend({}, Access.defaultOptions);
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

    // resolve router access
    if ( Access.defaultOptions.vueRouter ) {
      this.accessRouterMiddleware = new RouterMiddleware(this, {routes: options.routes || []});
    }


  }


  /**
   *
   * @param {RoleTypes} role
   * @param {string[]} permission
   */
  public setRole(role: RoleTypes, permission?: string[]): void {
    let roles = this.accessUserOptions.roles;
    let newRoles = getRole(role, permission);

    if (newRoles.length <= 1 && typeof role === 'string' && permission) {
      this.accessUserOptions.permissions = permission;
    }
    this.accessUserOptions.roles = newRoles;
  }

  /**
   *
   * @param {RoleTypes} role
   * @param {string[]} permission
   */
  public appendRole(role: RoleTypes, permission?: string[]): void {
    let oldRoles = this.accessUserOptions.roles;
    let newRole = getRole(role, permission);
    this.accessUserOptions.roles = oldRoles.concat(newRole);
    if (newRole.length <= 1 && typeof role === 'string' && permission) {
      this.accessUserOptions.permissions = permission;
    }
  }

  /**
   * set permission
   * @param {string | string[]} permissions
   */
  public setPermission(permissions: string | string[]):void {
    this.accessUserOptions.permissions = standardize(permissions);
  }

  /**
   * set permission
   * @param {string | string[]} permissions
   */
  public appendPermission(permissions: string | string[]): void {
    this.accessUserOptions.permissions = this.accessUserOptions.permissions.concat(standardize(permissions));
  }

  /**
   *
   * @param {Post} post
   * @param {string} key
   * @returns {boolean}
   */
  public owns(post: Post, key: string = 'user_id'): boolean {
    let user = this.getUser();
    if (user) {
      return user.owns(post, key);
    }
    return false;
  }


  /**
   *
   * @param {StringOrStringArray} role
   * @param {boolean} requiredAll
   * @returns {boolean}
   */
  public hasRole(role: StringOrStringArray, requiredAll: boolean = false):boolean {
    let user = this.getUser();
    if (user) {
      return user.hasRole(role, requiredAll);
    }
    return false;
  }

  /**
   *
   * @param {string | string[]} permission
   * @param {boolean} requiredAll
   * @returns {boolean}
   */
  public can(permission: StringOrStringArray, requiredAll: boolean = false): boolean {
    let user = this.getUser();
    if (user) {
      return user.can(permission, requiredAll);
    }
    return false;
  }

  /**
   *
   * @param {string | string[]} permission
   * @param {boolean} requiredAll
   * @returns {boolean}
   */
  public hasPermission(permission: StringOrStringArray, requiredAll: boolean = false): boolean {
    return this.can(permission, requiredAll);
  }

  /**
   *
   * @param {string | string[]} permission
   * @param {boolean} requiredAll
   * @returns {boolean}
   */
  public isAbleTo(permission: StringOrStringArray, requiredAll: boolean = false): boolean {
    return this.can(permission, requiredAll);
  }

  /**
   *
   * @param {StringOrStringArray} permissions
   * @param {Post} post
   * @param {RoleAndOwnsOptions} options
   * @returns {boolean}
   */
  public canAndOwns(permissions: StringOrStringArray, post: Post, options: RoleAndOwnsOptions = {
    requireAll: false,
    foreignKeyName: 'user_id'
  }): boolean {
    let user = this.getUser();
    if (user) {
      return user.canAndOwns(permissions, post, options);
    }
    return false;
  }

  /**
   *
   * @param {StringOrStringArray} roles
   * @param {StringOrStringArray} permissions
   * @param {AbilityOptions} options
   * @returns {boolean | {validateAll?: boolean; roles: MapKeyStringValueBoolean; permissions: MapKeyStringValueBoolean}}
   */
  public ability(roles: StringOrStringArray, permissions: StringOrStringArray, options: AbilityOptions = {
    validate_all: false,
    return_type: 'both'
  }): boolean | {
    validateAll?: boolean;
    roles: MapKeyStringValueBoolean,
    permissions: MapKeyStringValueBoolean
  } {
    let user = this.getUser();
    if (user) {
      return user.ability(roles, permissions, options);
    }
    return false;
  }

  /**
   *
   * @param {string} event
   * @param args
   * @returns {this}
   */
  public $emit(event: string, ...args: any[]){
    this._vm.$emit(event, ...args);
    return this;
  }

  /**
   *
   * @param {string | string[]} event
   * @param {Function} callback
   * @returns {this}
   */
  public $on(event: string | string[], callback: Function){
    this._vm.$on(event, callback);
    return this;
  }

  /**
   *
   * @param {string | string[]} event
   * @param {Function} callback
   * @returns {this}
   */
  public $once(event: string | string[], callback: Function) {
    this._vm.$on(event, callback);
    return this;
  }

  /**
   *
   * @param {string | string[]} event
   * @param {Function} callback
   * @returns {this}
   */
  public $off(event?: string | string[], callback?: Function) {
    this._vm.$off(event, callback);
    return this;
  }

  /**
   *
   * @returns {boolean | User}
   */
  private getUser():false|User {
    let _vm: any = this._vm;
    if (_vm && _vm.user) {
      return <User> _vm.user;
    }
    return false;
  }
}

/**
 *
 * @param {Access} access
 * @param {AccessUserOptions} accessUser
 * @returns {Vue}
 */
function resetUserInfoVm(access: Access, accessUser: AccessUserOptions): VueConstructor {
  return new VueConstructor({
    data() {
      return <{access: AccessUserOptions, user?: User}> {
        access: accessUser,
        user: undefined
      }
    },
    watch: {
      access: {
        handler(current) {
          this.user = new User(current.roles, current.permissions, current.user_id);
        },
        deep: true
      }
    },
    created() {
      this.user = new User(accessUser.roles, accessUser.permissions, accessUser.user_id);
    }
  });
}

/**
 *
 * @param {typeof VueConstructor} _Vue
 * @param Options
 */
export const install = function (_Vue: typeof VueConstructor, Options?: AccessOptions) {
  if (Vue && Vue === _Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vue.access.control] already installed. Vue.use(VueAccessControl) should be called only once.'
      );
    }
    return;
  }
  Vue = _Vue;
  if (Options) {
    extend(Access.defaultOptions, Options);
  }
  ApplyMixin(Vue);
  installFn(Vue);
};
