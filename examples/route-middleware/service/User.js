import { Settings } from './Settings';
import { keyBy } from 'lodash';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const acl = require('../data/acl.json');

export class User {
  /**
   *
   * @type {Access}
   */
  static access = null;

  /**
   *
   * @type {VueRouter}
   */
  static router = null;

  static login({ name, password }) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        // access token
        localStorage.setItem('token', Date.now());
        User.access.reset();
        resolve();
      }, 200);
    });
  }

  static freshUserInfo(token) {
    return new Promise(function(resolve, reject) {
      const settings = Settings.getSettings();
      const aclKeyBy = keyBy(acl, 'role');

      const userInfo = {
        id: 1,
        roles: settings.selectedRoles.map(role => ({
          role: role,
          permissions: aclKeyBy[role]['permission'],
        })),
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        name: 'administrator',
      };

      setTimeout(() => {
        User.access.setLoginUserInfo({
          userId: userInfo.id,
          roles: userInfo.roles,
          permissions: [],
        });
        User.access.setExtendInfo({
          userInfo,
        });
        resolve(userInfo);
      }, 100);
    });
  }

  static logout() {
    return new Promise(function(resolve) {
      setTimeout(() => {
        localStorage.removeItem('token');
        User.access.reset();
        resolve();
      }, 1000);
    });
  }
}
