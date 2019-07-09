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
        resolve();
      }, 200);
    });
  }

  static freshUserInfo(token) {
    return new Promise(function(resolve, reject) {
      const userInfo = {
        id: 1,
        roles: ['administrator'],
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        name: '超级管理员',
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
}
