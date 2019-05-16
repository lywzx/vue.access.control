import { NavigationGuard, RawLocation, Route, VueRouter } from "vue-router/types/router";
import { Access } from "../Access";
import RouterMiddleware from "./RouterMiddleware";
import { assert } from "../util";


const beforeEach: NavigationGuard = function(this: VueRouter, to: Route, from: Route, next) {
  let app:any = this.app.$options;
  let access: Access = <Access> app.access;

  if (!(access && access.accessRouterMiddleware)) {
    next();
    return assert(true, `not be install correct or not open route middleware function`);
  }
  let routerMiddleWare: RouterMiddleware = <RouterMiddleware> access.accessRouterMiddleware;
  let meta: any = to.meta;

  routerMiddleWare.runMiddleware({
    middleware: meta.middleware || [],
    next: next
  }, this, to, from);
};

export default beforeEach;
