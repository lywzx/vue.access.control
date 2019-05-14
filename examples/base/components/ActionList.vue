<template>
  <div>
    <div v-for="(permission, roleName) in permissions" :key="roleName">
      <divider orientation="left">{{roles[roleName].roleName}}</divider>
      <div class="permission-list">
        <a-button class="permission-item" type="primary" v-for="(per, index) in permission" :key="index" v-access="per.permissions" :disabled="false" :title="per.permission">{{per.permissionName}}</a-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {
    Permissions,
    Roles
  } from '../data/RoleAndPermission';
  import {
    Divider,
    Button as AButton
  } from 'ant-design-vue';
  import {
    keyBy
  } from 'lodash';

  export default {
    components: {
      Divider,
      AButton
    },
    computed: {
      roles() {
        return Object.freeze(keyBy(Roles, 'role'));
      },
      permissions() {
        return Object.freeze(Permissions);
      }
    }
  }
</script>
<style lang="less" >
  .permission-list {
    padding-left: 20px;
    padding-right: 20px;

    .permission-item {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>
