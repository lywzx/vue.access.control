import Home from '../views/Home/Index';
import User from '../views/User/Index';
import AddOrEditPost from '../views/Post/AddOrEdit';
import Detail from '../views/Post/Detail';
import Login from '../views/User/Login';
import Admin from '../views/Admin/Index';
import Layout from '../views/Admin/Layout';
import UserCreate from '../views/Admin/User/Create';
import UserList from '../views/Admin/User/List';
import RoleList from '../views/Admin/Role/List';
import PermissionList from '../views/Admin/Permission/List';
import PermissionCreate from '../views/Admin/Permission/Create';

export default [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      middleware: [],
    },
  },
  {
    path: '/user',
    component: User,
    meta: {
      middleware: ['login', 'role:admin'],
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      middleware: ['login', 'role:admin'],
    },
  },
  {
    path: '/post',
    component: AddOrEditPost,
    meta: {
      middleware: ['login', 'role:admin'],
    },
  },
  {
    path: '/detail/:post_id(\\d+)?',
    component: Detail,
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      middleware: [],
    },
    children: [
      // user manage
      {
        name: 'admin_user',
        path: 'user',
        meta: {
          type: 'pie-chart',
          title: 'User Manage',
        },
        component: Layout,
        children: [
          {
            name: 'admin_user_create',
            path: 'create',
            component: UserCreate,
            meta: {
              type: 'bbb',
              title: 'User Create',
            },
          },
          {
            name: 'admin_user_list',
            path: 'list',
            component: UserList,
            meta: {
              type: 'aaa',
              title: 'User List',
            },
          },
        ],
      },
      // role manage
      {
        name: 'admin_role',
        meta: {
          type: 'desktop',
          title: 'Role Manage',
        },
        path: 'role',
        component: Layout,
        children: [
          {
            name: 'admin_role_list',
            path: 'list',
            component: RoleList,
            meta: {
              type: 'aaa',
              title: 'Role List',
            },
          },
        ],
      },
      // permission manage
      {
        name: 'admin_permission',
        meta: {
          type: 'file',
          title: 'Permission Manage',
        },
        path: 'permission',
        component: Layout,
        children: [
          {
            name: 'admin_permission_list',
            path: 'list',
            component: PermissionList,
            meta: {
              type: '',
              title: 'Permission List',
            },
          },
          {
            name: 'admin_permission_create',
            path: 'create',
            component: PermissionCreate,
            meta: {
              type: '',
              title: 'Permission Create',
            },
          },
        ],
      },
      // access demo
      {
        name: 'admin_access_demo',
        meta: {
          type: 'file',
          title: 'Access Demo',
        },
        path: 'demo',
        component: Layout,
        children: [
          {
            path: 'first',
            name: 'admin_access_demo1',
            meta: {
              title: 'access demo1',
              type: '',
            },
          },
        ],
      },
    ],
  },
];

export const AsyncStudentRoute = [
  {
    path: '/admin',
    component: Admin,
  },
];

export const AsyncTeacherRoute = [];
