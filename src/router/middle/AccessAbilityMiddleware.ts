import AccessRoleMiddleware from './AccessRoleMiddleware';
import { handleFnType } from '../../types/TypesAccessMiddleware';

export default class AccessAbilityMiddleware extends AccessRoleMiddleware {
  protected _methodName: handleFnType = 'ability';
}
