import { Access, install } from './Access';
import { beforeEach, afterEach } from './router/index';
import RouterMiddleware from './router/RouterMiddleware';
import LoginMiddleware from './router/middle/LoginMiddleware';

export default {
  install,
  Access,
};

export { beforeEach, afterEach, RouterMiddleware, LoginMiddleware };
