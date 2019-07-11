<template>
  <a-card :title="$route.meta.title" :bordered="false" >
    <p v-if="$access.isLogin()">user is login, <router-link :to="{name: 'admin_user'}">click, then jump to admin manage page</router-link>.</p>
    <p v-else-if>User not logged in, <router-link :to="{name: 'user_login'}">go to login</router-link></p>
  </a-card>
</template>
<script type="text/ecmascript-6">
  import {
    Card as ACard
  } from 'ant-design-vue';
  export default {
    components: {
      ACard
    }
  }
</script>
<style lang="less"></style>
