<template>
  <div v-if="$access.hasRole(roleName)" >
    <divider orientation="left">{{roles[roleName].roleName}}</divider>
    <div class="permission-list">
      <a-button class="permission-item" type="primary" v-for="(per, index) in permission" :key="index" :disabled="!$access.hasRole(roleName)" :title="per.permission">{{per.permissionName}}</a-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {
    Divider,
    Button as AButton
  } from 'ant-design-vue';

  export default {
    components: {
      Divider,
      AButton,
    },
    props: {
      roles: {
        required: true,
        type: Object
      },
      roleName: {
        required: true,
        type: [String, Array]
      },
      permission: {
        required: true,
        type: Array
      }
    }
  }
</script>
