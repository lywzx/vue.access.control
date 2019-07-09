import VueAccessControl, { LoginMiddleware } from 'vue.access.control';
import Vue from 'vue';
import { AsyncStudentRoute, AsyncTeacherRoute } from '../router/routes';
import { User } from '../service/User';

Vue.use(VueAccessControl, {
  vueRouter: true,
  globalMiddleWares: ['login?'],
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

export default Access;
