import { RouteConfig, VueRouter, Route } from "vue-router/types/router";
import RouterMiddlewareConstructorOptions from "../types/RouterMiddlewareConstructorOptions";
import defaultMiddleWares from './middle/index';
import MiddleWares from "../types/MiddleWares";
import {
  isEmpty,
  isFunction,
  isString,
  trim
} from 'lodash';
import PipeLine from "./PipeLine";
import { Access } from "../Access";
import { assert } from "../util";

export default class RouterMiddleware {

  static middleWares:MiddleWares = defaultMiddleWares;

  static middleWaresAlias: Partial<{[s: string]: string}> = {
    'can': 'can',
    'permission': 'hasPermission',
    'role': 'hasRole',
    'ability': 'ability'
  };

  /**
   * async router
   */
  public routes:RouteConfig[];

  /**
   *
   */
  private access: Access;

  /**
   *
   * @param {Access} access
   * @param {RouterMiddlewareConstructorOptions} options
   */
  constructor(access:Access, options?: RouterMiddlewareConstructorOptions) {
    if (options && options.routes) {
      this.routes = options.routes;
    } else {
      this.routes = [];
    }
    this.access = access;
  }

  /**
   * get middle function
   * @param {string[]} middles
   * @param {Function} next
   * @returns {Function}
   */
  public getMiddleWareFn(middles: string[], next: Function): Function {
    if (isEmpty(middles)) {
      return next;
    }

    let pipLine = new PipeLine(this.getMiddleFn(middles));

    return function(to: any, from: any) {
      pipLine.pipe(to, from);
    }
  }

  /**
   *
   * @param {string[]} middles
   * @returns {Function[]}
   */
  protected getMiddleFn(middles: string[]): Function[] {
    let middleWaresAlias = RouterMiddleware.middleWaresAlias;
    let middleWares = RouterMiddleware.middleWares;
    return middles.map((middle) => {
      let [fnName, fnArgString] = middle.split(':');
      let isOptional = fnName.substr(-1) === '?';
      fnName = isOptional ? fnName.substr(0, -1) : fnName;
      let methodName;
      let method:any;
      let access = this.access as any;
      let fnArgs = isString(fnArgString) ? fnArgString.split(',').map(function(item) {
        let result: any = trim(item);
        if (['true', 'false'].indexOf(result.toLowerCase())) {
          result = Boolean(result);
        }
        return result;
      }) : [];

      if ((methodName = middleWaresAlias[fnName]) && (method = access[methodName]) && isFunction(method)) {
        return function(to: any, from: any, next: any ) {
          let ret: boolean = (method as Function).apply(access, fnArgs);
          next( ret ? undefined : false);
        }
      } else if (isFunction(method = middleWares[fnName])) {
        return method;
      }
      assert(true, `middleware name: ${fnName} not defined, please call RouterMiddleware:extend define '${fnName}'`);
    });
  }


  public runMiddleware(options:{
    middleware: string[],
    next: Function
  }, scope: VueRouter, to: Route, from: Route ) {
    let {
      middleware,
      next
    } = options;
    let middlewFn = this.getMiddleWareFn(middleware, next);

    middlewFn.call(scope, to, from);
  }
}
