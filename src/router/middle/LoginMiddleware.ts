import { Route, VueRouter } from 'vue-router/types/router';
import MiddlewareInterface from '../../interface/MiddlewareInterface';
import { Access } from '../../Access';

export default class LoginMiddleware implements MiddlewareInterface {
  private args = [];

  private isOptional: boolean = false;

  public handle(next: Function, router: VueRouter, to: Route, from: Route, ...args: any[]): void {
    setTimeout(() => {
      // @ts-ignore
      let access = router.app.$access as Access;
      next(access.isLogin() || this.isOptional ? undefined : false);
    });
  }

  public clearArgs() {
    this.args = [];
    return this;
  }

  public setArgs(...args: any) {
    this.args = args;
    return this;
  }

  public optional() {
    this.isOptional = true;
    return this;
  }
}
