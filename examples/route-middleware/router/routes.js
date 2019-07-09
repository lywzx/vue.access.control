import Login from '../views/User/Login';
import Admin from '../views/Admin/Index';
import Layout from '../views/Admin/Layout';
import UserCreate from '../views/Admin/User/Create';
import UserList from '../views/Admin/User/List';
import RoleList from '../views/Admin/Role/List';
import PermissionList from '../views/Admin/Permission/List';
import PermissionCreate from '../views/Admin/Permission/Create';
import AccessRouterLinkDemo from '../views/Admin/Access/AccessRouterLinkDemo';
import VAccessShowDemo from '../views/Admin/Access/VAccessShowDemo';

export default [
  {
    path: '',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
    meta: {
      middleware: ['login?'],
    },
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      middleware: ['login'],
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
              title: 'AccessRouterLink Demo',
              type: '',
            },
            component: AccessRouterLinkDemo,
          },
          {
            path: 'second',
            name: 'admin_access_demo2',
            meta: {
              title: 'VAccessShow Demo',
              type: '',
            },
            component: VAccessShowDemo,
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
