import { pick, partial } from 'lodash';

export const Roles = [
  {
    role: 'Administrator',
    roleName: '超级管理员',
    roleDescription: '拥有超级管理员的所有权限',
  },
  {
    role: 'CommonAdministrator',
    roleName: '普通管理员',
    roleDescription: '仅允许部分模块权限',
  },
  {
    role: 'Editor',
    roleName: '编辑人员',
    roleDescription: '仅允许帖子相关功能模块',
  },
  {
    role: 'Member',
    roleName: '普通会员',
    roleDescription: '普通游客及相关权限',
  },
  {
    role: 'Guest',
    roleName: '游客',
    roleDescription: '普通游客，一般未登录用户',
  },
];

const AllPermission = [
  {
    permission: 'create_user',
    permissionName: '新建用户',
    roles: ['Administrator'],
  },
  {
    permission: 'view_user',
    permissionName: '查看用户',
    roles: ['Administrator'],
  },
  {
    permission: 'delete_user',
    permissionName: '删除用户',
    roles: ['Administrator'],
  },
  {
    permission: 'update_user',
    permissionName: '更新用户',
    roles: ['Administrator'],
  },
  {
    permission: 'lock_user',
    permissionName: '锁定用户',
    roles: ['Administrator'],
  },

  {
    permission: 'create_forum_post',
    permissionName: '发布帖子',
    roles: ['Administrator', 'CommonAdministrator'],
  },
  {
    permission: 'delete_forum_post',
    permissionName: '删除帖子',
    roles: ['Administrator', 'CommonAdministrator'],
  },
  {
    permission: 'view_forum_post',
    permissionName: '查看帖子',
    roles: ['Administrator', 'CommonAdministrator', 'Editor', 'Member', 'Guest'],
  },
  {
    permission: 'reply_forum_post',
    permissionName: '评论/回复帖子',
    roles: ['Administrator', 'CommonAdministrator', 'Editor', 'Member'],
  },
  {
    permission: 'create_announcement',
    permissionName: '发布公告',
    roles: ['CommonAdministrator', 'Editor'],
  },
  {
    permission: 'delete_announcement',
    permissionName: '删除公告',
    roles: ['Administrator'],
  },
  {
    permission: 'view_announcement',
    permissionName: '查看公告',
    roles: ['CommonAdministrator', 'Editor', 'Member', 'Guest'],
  },
];

const filterPermission = function(permissions, role, except = false) {
  return permissions
    .filter(function(permission) {
      return permission.roles.indexOf(role) !== -1;
    })
    .map(partial(pick, partial.placeholder, ['permission', 'permissionName']));
};

export const Permissions = {
  Administrator: filterPermission(AllPermission, 'Administrator'),
  CommonAdministrator: filterPermission(AllPermission, 'CommonAdministrator'),
  Editor: filterPermission(AllPermission, 'Editor'),
  Member: filterPermission(AllPermission, 'Member'),
  Guest: filterPermission(AllPermission, 'Guest'),
};
