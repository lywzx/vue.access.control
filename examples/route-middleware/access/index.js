import VueAccessControl, { LoginMiddleware } from 'vue.access.control';
import Vue from 'vue';
import { AsyncStudentRoute, AsyncTeacherRoute } from '../router/routes';
import { User } from '../service/User';
import { extend, keyBy } from 'lodash';
import { Modal } from 'ant-design-vue';
import { Settings } from '../service/Settings';
import acl from '../data/acl.json';
const settings = Settings.getSettings();

Vue.use(VueAccessControl, {
  vueRouter: true,
  globalMiddleWares: ['login?'],
  loginRoute: {
    name: 'user_login',
  },
  foreignKeyName: 'user_id',
  notLoginRoleName: 'Guest',
  permissionDenyRedirectRoute: {
    name: 'user_login',
  },
  defaultRoute: {
    name: 'home',
  },
});

LoginMiddleware.handleExtend = function(next, ...args) {
  const token = localStorage.getItem('token');
  if (token) {
    User.freshUserInfo(token)
      .then(() => {
        next(true);
      })
      .catch(() => {
        next(false);
      });
  } else {
    next(false);
  }
};

const Access = new VueAccessControl.Access({
  routes: AsyncTeacherRoute.concat(AsyncStudentRoute),
});

User.access = Access;

// user logout
Access.$on('access:user:logout', function(isUserAction, router) {
  const route = router.currentRoute;
  // make page recheck middleware
  router.replace({
    path: route.path,
    query: extend({}, route.query, {
      _t: Date.now(),
    }),
    params: extend({}, route.params),
  });
});

const setLogoutTip = function(setting) {
  // login check
  if (setting.loginCheck === 2) {
    LoginMiddleware.notLoginWithTips = function(next) {
      Modal.confirm({
        title: 'Tip',
        content: 'The page need login?',
        okText: 'Login',
        cancelText: 'Cancel',
        onOk() {
          next(true);
        },
        onCancel() {
          next(false);
        },
      });
    };
  } else {
    LoginMiddleware.notLoginWithTips = null;
  }

  // current user roles
  const aclKey = keyBy(acl, 'role');
  Access.isLogin() &&
    Access.setRole(
      setting.selectedRoles.map(it => ({
        role: it,
        permissions: aclKey[it].permission,
      }))
    );
};
setLogoutTip(settings);
Access.$on('update:system:config', setLogoutTip);

export default Access;
