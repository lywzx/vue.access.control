import Home from '../views/Home/Index';
import User from '../views/User/Index';
import AddOrEditPost from '../views/Post/AddOrEdit';
import Detail from '../views/Post/Detail';
import Login from '../views/User/Login';
import Admin from '../views/Admin/Index';

export default [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user',
    component: User,
    meta: {
      middleware: ['login', 'role:admin']
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      middleware: ['login', 'role:admin']
    }
  },
  {
    path: '/post',
    component: AddOrEditPost,
    meta: {
      middleware: ['login', 'role:admin']
    }
  },
  {
    path: '/detail/:post_id(\\d+)?',
    component: Detail
  }
];

export const AsyncStudentRoute = [
  {
    path: '/admin',
    component: Admin
  }
];


export const AsyncTeacherRoute = [

];


