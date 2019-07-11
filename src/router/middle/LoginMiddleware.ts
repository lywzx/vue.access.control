import { RawLocation } from 'vue-router/types/router';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { assert, isPromiseLike } from '../../util';
import MiddlewareHandle from '../../class/MiddlewareHandle';
import MiddlewareInterface from '../../interface/MiddlewareInterface';
import MiddlewareHandleOptions from '../../types/MiddlewareHandleOptions';

export default class LoginMiddleware extends MiddlewareHandle implements MiddlewareInterface {
  public static loginName: RawLocation;

  public static defaultRoute: RawLocation;

  public static handleExtend: (next?: (arg: boolean) => void, ...args: any[]) => Promise<boolean> | void;

  public static notLoginWithTips: (next: Function) => void;

  /**
   * @param next
   * @param router
   * @param to
   * @param from
   * @param access
   * @param showTip
   */
  public handle(next: Function, { router, to, from, access }: MiddlewareHandleOptions, showTip: boolean = true): void {
    // hack sometimes may can't get access instance, but i don't know why
    // @ts-ignore
    let loginStatus = access.isLogin();

    if (this.isTerminal()) {
      let ls = this.isOptional() || loginStatus === true;

      return next(ls ? undefined : false);
    }

    let nextAction = () => {
      let isLogin = access.isLogin();
      let isOptional = this.isOptional();
      let nextBoolean = isLogin || isOptional ? undefined : false;
      if (isFunction(LoginMiddleware.notLoginWithTips) && nextBoolean === false) {
        return LoginMiddleware.notLoginWithTips(function(result: boolean | RawLocation) {
          if (isString(result) || (isObject(result) && (result.path || result.name))) {
            next(result);
          }
          if (result) {
            assert(
              !!LoginMiddleware.loginName,
              `the loginName is undefined, please define loginName when vue.use(VueAccessControl, {
              loginName: \\\\...
            })`
            );
            next(LoginMiddleware.loginName);
          } else if (from === router.currentRoute || !from.matched.length) {
            assert(
              !!LoginMiddleware.defaultRoute,
              `the defaultRoute is undefined, please define defaultRoute when vue.use(VueAccessControl, {
              defaultRoute: \\\\...
            })`
            );
            next(LoginMiddleware.defaultRoute);
          } else {
            next(false);
          }
        });
      }
      if (nextBoolean === false) {
        assert(
          !!LoginMiddleware.loginName,
          `the loginName is undefined, please define loginName when vue.use(VueAccessControl, {
              loginName: \\\\...
            })`
        );
        return next(LoginMiddleware.loginName);
      }
      next();
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
