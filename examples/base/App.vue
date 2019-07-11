<template>
  <section>
    <role-list class="mt20"></role-list>
    <row class="mb20" type="flex" justify="start" align="middle">
      <Col class="mr20">
        请选择渲染的方式
      </Col>
      <Col>
        <a-radio-group name="radioGroup" v-model="renderType">
          <a-radio :value="1">使用v-if渲染</a-radio>
          <a-radio :value="2">使用v-show渲染</a-radio>
          <a-radio :value="3">使用v-access-show渲染</a-radio>
          <a-radio :value="4">全部显示，以禁用状态表示不可点</a-radio>
        </a-radio-group>
      </Col>
    </row>
    <action-list :render-type="renderType"></action-list>
  </section>
</template>

<script>
  import {
    Row,
    Col,
    Radio as ARadio
  } from 'ant-design-vue';
import RoleList from './components/RoleList.vue';
import ActionList from './components/ActionList.vue';

export default {
  components: {
    RoleList,
    ActionList,
    Row,
    Col,
    ARadio,
    ARadioGroup: ARadio.Group
  },
  data () {
    return {
      renderType: 1
    }
  }
}
</script>
<style lang="less">
  .mt20 {
    margin-top: 20px;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .mr20 {
    margin-right: 20px;
  }
</style>
