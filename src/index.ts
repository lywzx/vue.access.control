import { Access, install } from './Access';
import { beforeEach, afterEach } from './router/index';
import RouterMiddleware from './router/RouterMiddleware';
import LoginMiddleware from './router/middle/LoginMiddleware';
import MiddlewareHandle from './class/MiddlewareHandle';

export default {
  install,
  Access,
};

export { beforeEach, afterEach, RouterMiddleware, LoginMiddleware, MiddlewareHandle };
