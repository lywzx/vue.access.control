import { Route, VueRouter } from 'vue-router/types/router';
import { Access } from '../Access';

export default interface MiddlewareHandleOptions {
  router: VueRouter;
  to: Route;
  from: Route;
  access: Access;
}
