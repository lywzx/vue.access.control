import LoginMiddleware from './LoginMiddleware';
import accessMiddleware from './AccessMiddleware';

export default {
  login: new LoginMiddleware(),
  can: accessMiddleware('can'),
  permission: accessMiddleware('permission'),
  role: accessMiddleware('role'),
  ability: accessMiddleware('ability'),
};
