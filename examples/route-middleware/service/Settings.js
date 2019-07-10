import { extend } from 'lodash';

const defaultSetting = {
  slideView: 1,
};
export class Settings {
  /**
   *
   * @return {any}
   */
  static getSettings() {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem('routeMiddlewareSetting'));
    } catch (e) {
      saved = {};
    }
    return extend({}, defaultSetting, saved);
  }

  /**
   *
   * @param obj
   */
  static setSetting(obj) {
    localStorage.setItem('routeMiddlewareSetting', JSON.stringify(obj));
  }
}
