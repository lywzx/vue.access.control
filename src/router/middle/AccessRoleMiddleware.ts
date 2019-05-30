import MiddlewareInterface from '../../interface/MiddlewareInterface';
import { isFunction } from 'lodash';
import { handleFnType } from '../../types/TypesAccessMiddleware';
import MiddlewareHandle from '../../class/MiddlewareHandle';
import MiddlewareHandleOptions from '../../types/MiddlewareHandleOptions';
import { RawLocation } from 'vue-router/types/router';

let methodAlias = {
  role: 'hasRole',
  can: 'hasPermission',
  ability: 'ability',
};

export default class AccessRoleMiddleware extends MiddlewareHandle implements MiddlewareInterface {
  public static permissionDenyRedirectRoute: RawLocation;

  protected _methodName: handleFnType = 'role';

  public handle(next: Function, { access }: MiddlewareHandleOptions, role: any, permission?: any): void {
    if (access) {
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
        return next(
          result === true
            ? undefined
            : AccessRoleMiddleware.permissionDenyRedirectRoute
            ? AccessRoleMiddleware.permissionDenyRedirectRoute
            : false
        );
      }
    }
    next();
  }
}
