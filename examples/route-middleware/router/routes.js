import Login from '../views/User/Login';
import Admin from '../views/Admin/Index';
import Layout from '../views/Admin/Layout';
import AccessRouterLinkDemo from '../views/Admin/Access/AccessRouterLinkDemo';
import VAccessShowDemo from '../views/Admin/Access/VAccessShowDemo';
import SystemSettings from '../views/Admin/System/Settings';
import PagePlaceholder from '../views/Admin/Layout/PagePlaceholder';

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
          middleware: ['role:administrator|common_administrator'],
        },
        component: Layout,
        children: [
          {
            name: 'admin_user_create',
            path: 'create',
            component: PagePlaceholder,
            meta: {
              type: 'bbb',
              title: 'User Create',
              middleware: ['role:administrator'],
            },
          },
          {
            name: 'admin_user_list',
            path: 'list',
            component: PagePlaceholder,
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
          middleware: ['role:administrator|common_administrator'],
        },
        path: 'role',
        component: Layout,
        children: [
          {
            name: 'admin_role_list',
            path: 'list',
            component: PagePlaceholder,
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
          middleware: ['role:administrator'],
        },
        path: 'permission',
        component: Layout,
        children: [
          {
            name: 'admin_permission_list',
            path: 'list',
            component: PagePlaceholder,
            meta: {
              type: '',
              title: 'Permission List',
            },
          },
          {
            name: 'admin_permission_create',
            path: 'create',
            component: PagePlaceholder,
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
      {
        name: 'school_manage',
        path: 'school',
        meta: {
          type: 'file',
          title: 'School Manage',
          middleware: ['role:school_administrator|school_teacher|school_student'],
        },
        component: Layout,
        children: [
          {
            name: 'school_teacher_manage',
            path: 'teacher',
            meta: {
              title: 'Teacher Manage',
              middleware: ['role:school_administrator'],
            },
            component: PagePlaceholder,
          },
          {
            name: 'school_student_manage',
            path: 'student',
            meta: {
              title: 'Student Manage',
              middleware: ['role:school_teacher'],
            },
            component: PagePlaceholder,
          },
          {
            name: 'school_class_manage',
            path: 'class',
            meta: {
              title: 'School School',
              middleware: ['role:school_teacher|school_student'],
            },
            component: PagePlaceholder,
          },
        ],
      },
      {
        name: 'admin_system',
        path: 'system',
        meta: {
          type: '',
          title: 'System manage',
        },
        component: Layout,
        children: [
          {
            name: 'admin_system_settings',
            path: 'settings',
            meta: {
              title: 'System Settings',
            },
            component: SystemSettings,
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
