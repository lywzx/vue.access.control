import MiddlewareInterface from '../../interface/MiddlewareInterface';
import { Route, VueRouter } from 'vue-router/types/router';
import { Access } from '../../Access';
import { isFunction } from 'lodash';
import { handleFnType } from '../../types/TypesAccessMiddleware';

let methodAlias = {
  role: 'hasRole',
  can: 'hasPermission',
  ability: 'ability',
};

export default class AccessRoleMiddleware implements MiddlewareInterface {
  protected _methodName: handleFnType = 'role';

  protected _isOptional: boolean = false;

  protected _isTerminal: boolean = false;

  protected args: any[] = [];

  public handle(next: Function, router: VueRouter, to: Route, from: Route): void {
    let app = router.app as { $access?: Access };
    let args = this.args;
    if (app.$access) {
      let access = app.$access as Access;
      let result;
      // @ts-ignore
      if (methodAlias[this._methodName] && access && isFunction(access[methodAlias[this._methodName]])) {
        // @ts-ignore
        result = access[methodAlias[this._methodName]](args[0], args[1] || undefined);
      }

      if (result === true || result === false) {
        return next(result);
      }
    }
    next(true);
  }

  public clearArgs() {
    this.args = [];
    return this;
  }

  public setArgs(args: any[]) {
    this.args = args;
    return this;
  }

  public optional(optional: boolean = true) {
    this._isOptional = optional;
    return this;
  }

  public isTerminal(): boolean {
    return this._isTerminal;
  }

  public terminal(terminal: boolean) {
    this._isTerminal = terminal;
    return this;
  }

  public isOptional(): boolean {
    return this._isOptional;
  }
}
