<template>
  <section>
    <row type="flex" justify="center" align="middle">
      <Col  class="role-title">
        <p>请选择对应的角色</p>
      </Col>
      <Col class="role-list">
        <checkbox-group v-model="selected">
          <row :gutter="16" type="flex" justify="center">
            <Col v-for="(role, index) in roles" :key="index" >
              <div class="role-item" :class="{
                selected: selected.indexOf(role.role) !== -1
              }">
                <a-button icon="edit" class="role-edit-button" size="small" ></a-button>
                <checkbox :value="role.role">
                  <p class="role-name">{{role.roleName}}</p>
                  <p class="role-description">{{role.roleDescription}}</p>
                </checkbox>
              </div>
            </Col>
          </row>
        </checkbox-group>
      </Col>
    </row>
  </section>
</template>
<script type="text/ecmascript-6">
  import {
    Row,
    Col,
    Checkbox,
    Button as AButton
  } from 'ant-design-vue';
  import {
    Roles
  } from '../data/RoleAndPermission';

  export default {
    components: {
      Row,
      Col,
      Checkbox,
      CheckboxGroup: Checkbox.Group,
      AButton
    },
    data() {
      return {
        selected: []
      }
    },
    computed: {
      roles() {
        return Object.freeze(Roles);
      }
    },
    created() {

    }
  }
</script>
<style lang="less">
  .role-title {
    margin-right: 20px;
  }
  .role-list {

  }
  .role-item {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;

    &:hover,&.selected {
      border-color: #1890ff;
    }

    .role-edit-button {
      position: absolute;
      right: 10px;
      top: 18px;
    }
    .ant-checkbox {
      position: absolute;
      top: auto;
      right: 10px;
      bottom: 20px;
      width: 16px;
      height: 16px;
    }
  }
</style>
