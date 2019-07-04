import MiddlewareInterface from '../../interface/MiddlewareInterface';
import isFunction from 'lodash/isFunction';
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

  public handle(next: Function, { access }: MiddlewareHandleOptions, role: any, permission?: any, options?: any): void {
    if (access) {
      let result;
      // @ts-ignore
      if (methodAlias[this._methodName] && access && isFunction(access[methodAlias[this._methodName]])) {
        // options? 针对 ability中间件作处理
        let ops = undefined;
        if (this._methodName === 'ability') {
          ops = {
            validatedAll: options === 'requiredAll',
            returnType: 'boolean',
          };
        }
        // @ts-ignore
        result = access[methodAlias[this._methodName]](role, permission, ops);
      }

      if (result === true || result === false) {
        if (result === false && !this.isTerminal()) {
          access.$emit('route:middleware:access:deny', role, permission, options);
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
