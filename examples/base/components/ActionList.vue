<template>
  <div>
      <component v-for="(permission, roleName) in permissions" :is="renderComponent" :key="roleName" :roles="roles" :role-name="roleName" :permission="permission"></component>
  </div>
</template>
<script type="text/ecmascript-6">
  import {
    Permissions,
    Roles
  } from '../data/RoleAndPermission';

  import {
    keyBy
  } from 'lodash';
  import ActionsWithVIf from './Actions/ActionsWithVIf';
  import ActionsWithVShow from './Actions/ActionsWithVShow';
  import ActionsWithVAccessShow from './Actions/ActionsWithVAccessShow';
  import ActionsWithDisable from './Actions/ActionsWithDisable';

  export default {
    props: {
      renderType: {
        required: true,
        type:  Number,
        default: 1
      }
    },
    components: {
      ActionsWithVIf,
      ActionsWithVShow,
      ActionsWithVAccessShow,
      ActionsWithDisable
    },
    computed: {
      roles() {
        return Object.freeze(keyBy(Roles, 'role'));
      },
      permissions() {
        return Object.freeze(Permissions);
      },
      renderComponent() {
        return this.$options.components[[
          undefined,
          'ActionsWithVIf',
          'ActionsWithVShow',
          'ActionsWithVAccessShow',
          'ActionsWithDisable'
        ][this.renderType]]
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
