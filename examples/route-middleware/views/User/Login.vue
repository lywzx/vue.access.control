<template>
  <a-card title="登录" class="tac root">
    <div class="login-container">
      <div>
        <a-button type="primary" block @click="login">Mock Login Button</a-button>
      </div>
      <div class="mt20">
        <router-link :to="{name: 'admin_system_settings'}">System Settings</router-link>
      </div>
      <div class="mt20">
        <router-link :to="{name: 'admin_access_demo1'}">Access Demo1</router-link>
      </div>
    </div>
  </a-card>
</template>
<script type="text/ecmascript-6">
  import {
    Card as ACard,
    Button as AButton,
  } from 'ant-design-vue';
  import { User } from '../../service/User';

  export default {
    components: {
      ACard,
      AButton
    },
    methods: {
      login() {
        User.login({name: '', password: ''})
          .then(() => {
            this.$router.push({
              name: 'admin_permission'
            })
          });
      }
    }
  }
</script>
<style type="text/css">
  .mt20 {
    margin-top: 20px;
  }
  .tac {
    text-align: center;
  }
  .root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ant-card-body {
    flex: 1;
  }
  .login-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
