import MiddlewareInterface from '../../interface/MiddlewareInterface';
import { Route, VueRouter } from 'vue-router/types/router';
import { Access } from '../../Access';
import { isFunction } from 'lodash';
import { handleFnType } from '../../types/TypesAccessMiddleware';
import MiddlewareHandle from '../../class/MiddlewareHandle';

let methodAlias = {
  role: 'hasRole',
  can: 'hasPermission',
  ability: 'ability',
};

export default class AccessRoleMiddleware extends MiddlewareHandle implements MiddlewareInterface {
  protected _methodName: handleFnType = 'role';

  public handle(next: Function, router: VueRouter, to: Route, from: Route, role: any, permission?: any): void {
    let app = router.app as { $access?: Access };
    if (app.$access) {
      let access = app.$access as Access;
      let result;
      // @ts-ignore
      if (methodAlias[this._methodName] && access && isFunction(access[methodAlias[this._methodName]])) {
        // @ts-ignore
        result = access[methodAlias[this._methodName]](role, permission);
      }

      if (result === true || result === false) {
        if (result === false && !this.isTerminal()) {
          access.$emit('route:middleware:access:deny', role, permission);
        }
        return next(result);
      }
    }
    next(true);
  }
}
