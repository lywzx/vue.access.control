import { RouteConfig, VueRouter, Route } from 'vue-router/types/router';
import RouterMiddlewareConstructorOptions from '../types/RouterMiddlewareConstructorOptions';
import defaultMiddleWares from './middle/index';
import MiddleWares from '../types/MiddleWares';
import { isFunction, isString, trim } from 'lodash';
import PipeLine from '../class/PipeLine';
import { Access } from '../Access';
import { assert } from '../util';

export default class RouterMiddleware {
  public static middleWares: MiddleWares = defaultMiddleWares;

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
    },
    scope: VueRouter,
    to: Route,
    from: Route
  ) {
    /*let { middleware, next } = options;
    let middlewFn = this.getMiddleWareFn(middleware, next);

    middlewFn.call(scope, to, from);*/
    return this.pipeLine
      .send(scope, to, from)
      .through(options.middleware)
      .then(function(result: any) {
        options.next(result);
      });
  }
}
