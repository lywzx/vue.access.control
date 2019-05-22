import { Route, VueRouter } from 'vue-router/types/router';
import MiddlewareInterface from '../../interface/MiddlewareInterface';
import { Access } from '../../Access';
import { isFunction, isObject } from 'lodash';
import { assert } from '../../util';

export default class LoginMiddleware implements MiddlewareInterface {
  private args: any[] = [];

  private _isOptional: boolean = false;

  private _isTerminal: boolean = false;

  public static handleExtend: (next?: (arg: boolean) => void, ...args: any[]) => Promise<boolean> | void;

  /**
   * @param next
   * @param router
   * @param to
   * @param from
   * @param args
   */
  public handle(next: Function, router: VueRouter, to: Route, from: Route, ...args: any[]): void {
    // hack sometimes may can't get access instance, but i don't know why
    // @ts-ignore
    let access = (router.app.$access || router.app.$options.access) as Access;
    let loginStatus = access.isLogin();
    let nextAction = () => {
      next(access.isLogin() || this.isOptional() ? undefined : false);
    };
    if (loginStatus === undefined) {
      let handleExtend = LoginMiddleware.handleExtend;
      assert(isFunction(handleExtend), 'please set `LoginMiddleware.handleExtend` method');
      let result = handleExtend.call(
        this,
        (result: boolean) => {
          access.accessData.userOptions.isLogin = result;

          setTimeout(nextAction);
        },
        router,
        to,
        from,
        ...args
      );

      // is promise
      if (isObject(result) && isFunction(result.then)) {
        result
          .then(result => {
            access.accessData.userOptions.isLogin = result;
          })
          .then(nextAction)
          .catch(() => {
            nextAction();
          });
      }
    } else {
      nextAction();
    }
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
