import { RawLocation, Route, VueRouter } from 'vue-router/types/router';
import { Access } from '../../Access';
import { isFunction } from 'lodash';
import { assert, isPromiseLike } from '../../util';
import MiddlewareHandle from '../../class/MiddlewareHandle';
import MiddlewareInterface from '../../interface/MiddlewareInterface';

export default class LoginMiddleware extends MiddlewareHandle implements MiddlewareInterface {
  public static loginName: RawLocation;

  public static defaultPage: RawLocation;

  public static handleExtend: (next?: (arg: boolean) => void, ...args: any[]) => Promise<boolean> | void;

  public static notLoginWithTips: (next: Function) => void;

  /**
   * @param next
   * @param router
   * @param to
   * @param from
   * @param showTip
   */
  public handle(next: Function, router: VueRouter, to: Route, from: Route, showTip: boolean = true): void {
    // hack sometimes may can't get access instance, but i don't know why
    // @ts-ignore
    let access = (router.app.$access || router.app.$options.access) as Access;
    let loginStatus = access.isLogin();
    let nextAction = () => {
      let isLogin = access.isLogin();
      let isOptional = this.isOptional();
      let isTerminal = this.isTerminal();
      if (isTerminal || !isFunction(LoginMiddleware.notLoginWithTips) || !LoginMiddleware.loginName) {
        next(isLogin || isOptional ? undefined : false);
      } else if (isOptional || isLogin) {
        next();
      } else if (!isLogin) {
        LoginMiddleware.notLoginWithTips(function(result: boolean) {
          if (result) {
            next(LoginMiddleware.loginName);
          } else {
            next(from.matched.length || LoginMiddleware.defaultPage === null ? false : LoginMiddleware.defaultPage);
          }
        });
      } else {
        next(false);
      }
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
        showTip
      );

      // is promise
      if (isPromiseLike(result)) {
        (result as Promise<any>)
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
}
