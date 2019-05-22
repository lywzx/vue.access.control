import AccessRoleMiddleware from './AccessRoleMiddleware';
import { handleFnType } from '../../types/TypesAccessMiddleware';

export default class AccessCanMiddleware extends AccessRoleMiddleware {
  protected _methodName: handleFnType = 'can';
}
