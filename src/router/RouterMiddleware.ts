import { RouteConfig, VueRouter, Route } from 'vue-router/types/router';
import RouterMiddlewareConstructorOptions from '../types/RouterMiddlewareConstructorOptions';
import defaultMiddleWares from './middle/index';
import MiddleWares from '../types/MiddleWares';
import PipeLine from '../class/PipeLine';
import { Access } from '../Access';
import { uniq } from 'lodash';

export default class RouterMiddleware {
  public static middleWares: MiddleWares = defaultMiddleWares;

  /**
   * global middleWares
   */
  protected static globalMiddleWares: string[] = [];

  /**
   * async router
   */
  public routes: RouteConfig[];

  /**
   *
   */
  private access: Access;

  /**
   *
   */
  private pipeLine = new PipeLine();

  /**
   *
   * @param {Access} access
   * @param {RouterMiddlewareConstructorOptions} options
   */
  public constructor(access: Access, options?: RouterMiddlewareConstructorOptions) {
    if (options && options.routes) {
      this.routes = options.routes;
    } else {
      this.routes = [];
    }
    this.access = access;
  }

  public runMiddleware(
    options: {
      middleware: string[];
      next: Function;
      terminal?: boolean;
    },
    scope: VueRouter,
    to: Route,
    from: Route
  ) {
    /*let { middleware, next } = options;
    let middlewFn = this.getMiddleWareFn(middleware, next);

    middlewFn.call(scope, to, from);*/
    console.log('route defined middleware', options.middleware);
    let middleWares = this.getCurrentMiddleWares(options.middleware);
    console.log('route run middleware', middleWares);

    return this.pipeLine
      .send(scope, to, from)
      .through(middleWares, options.terminal || false)
      .then(function(result: any) {
        options.next(result);
      });
  }

  /**
   * get middlewares
   * @param middleWares
   */
  private getCurrentMiddleWares(middleWares: string[]): string[] {
    let globalMiddleWares = RouterMiddleware.globalMiddleWares;
    let middles = globalMiddleWares.concat(middleWares);
    let resultMiddleWares: string[] = [];
    // remove repeat middles
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let i = 0, current; (current = middles[i]); i++) {
      if (current.substr(0, 1) === '-') {
        let realMiddles = current.substr(1);
        resultMiddleWares = resultMiddleWares.filter(item => item === realMiddles || item === realMiddles + '?');
        continue;
      }
      resultMiddleWares.push(current);
    }

    return uniq(resultMiddleWares);
  }

  /**
   * set global middleWare
   * @param middleWares
   */
  public static setGlobalMiddleWares(middleWares?: string[]): void {
    RouterMiddleware.globalMiddleWares = middleWares || [];
  }
}
