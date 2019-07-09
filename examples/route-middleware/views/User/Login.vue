<template>
  <a-card title="登录" class="tac root">
    <div class="login-container">
      <div>
        <a-button type="primary" block @click="login">点击按钮，模拟登录</a-button>
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
              name: 'admin_access_demo'
            })
          });
      }
    }
  }
</script>
<style type="text/css">
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
  }
  .ant-card-head {

  }
  .ant-card-body .login-container {
    flex: 1;
  }
</style>
