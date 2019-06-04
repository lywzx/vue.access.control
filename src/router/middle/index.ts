import LoginMiddleware from './LoginMiddleware';
import AccessRoleMiddleware from './AccessRoleMiddleware';
import AccessCanMiddleware from './AccessCanMiddleware';
import AccessAbilityMiddleware from './AccessAbilityMiddleware';

export default {
  login: LoginMiddleware,
  can: AccessCanMiddleware,
  role: AccessRoleMiddleware,
  ability: AccessAbilityMiddleware,
};
