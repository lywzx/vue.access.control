import { NavigationGuard, Route, RouteRecord, VueRouter } from 'vue-router/types/router';
import { Access } from '../Access';
import RouterMiddleware from './RouterMiddleware';
import { assert } from '../util';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import get from 'lodash/get';

const beforeEach: NavigationGuard = function(this: VueRouter, to: Route, from: Route, next) {
  let app: any = this.app.$options;
  let access: Access = app.access as Access;

  if (!(access && access.accessRouterMiddleware)) {
    next();
    return assert(true, 'not be install correct or not open route middleware function');
  }
  let routerMiddleWare: RouterMiddleware = access.accessRouterMiddleware as RouterMiddleware;
  let matched: RouteRecord[] = to.matched;
  let middleware: string[] = flatten(map(matched, (item: RouteRecord) => get(item, 'meta.middleware', [])));

  routerMiddleWare.runMiddleware(
    {
      middleware: middleware,
      next: next,
    },
    this,
    to,
    from
  );
};

export default beforeEach;
