<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <template v-if="$access.isLogin()">
        <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
        <span>{{currUser.name}}</span>
      </template>
      <template v-else>
        <span @click="setUser('administrator', '超级管理员')">点击立即登录</span>
      </template>
    </span>
    <a-menu style="width: 150px" slot="overlay" @click="handleMenuClick" v-if="$access.isLogin()">
      <template v-for="(item, index) in dropMenu" >
        <a-menu-item v-for="(it, idx) in item" :key="`${index}-${idx}`" :item="it">
          <a-icon v-if="it.icon" :type="it.icon" />
          <span>{{it.text}}</span>
        </a-menu-item>
        <a-menu-divider v-if="index !== dropMenu.length - 1" />
      </template>
    </a-menu>
  </a-dropdown>
</template>

<script>
  import {
    Dropdown as ADropdown,
    Avatar as AAvatar,
    Menu as AMenu,
    Icon as AIcon
  } from 'ant-design-vue';

  export default {
    name: 'HeaderAvatar',
    components: {
      ADropdown,
      AAvatar,
      AMenu,
      AIcon,
      AMenuItem: AMenu.Item,
      AMenuDivider: AMenu.Divider
    },
    computed: {
      currUser () {
        return this.$access.getExtendInfo('userInfo');
      },
      access() {
        return this.$access;
      },
      dropMenu () {
        return [
          [
            {
              method: 'setUser',
              role: 'administrator',
              icon: 'user',
              text: '超级管理员'
            },
            {
              method: 'setUser',
              role: 'common_administrator',
              icon: 'user',
              text: '普通管理员'
            },
            {
              method: 'setUser',
              role: 'common_audit',
              icon: 'user',
              text: '普通审核员'
            },
            {
              method: 'setUser',
              role: 'school_administrator',
              icon: 'user',
              text: '学校管理员'
            },
            {
              method: 'setUser',
              role: 'school_teacher',
              icon: 'user',
              text: '普通教师'
            },
            {
              method: 'setUser',
              role: 'school_student',
              icon: 'user',
              text: '普通学生'
            }
          ],
          [
            {
              method: 'logout',
              icon: 'poweroff',
              text: '退出登录'
            }
          ]
        ];
      }
    },
    methods: {
      handleMenuClick(item) {
        const it = item.item.$attrs.item;
        this[it.method](it.role, it.text);
      },
      setUser( role, text ) {
        //this.$access.setRole(role);
        this.$access.setLoginUserInfo({
          isLogin: true,
          userId: 1,
          roles: [role],
          permissions: []
        });
        this.$access.setExtendInfo({
          userInfo: {
            role: role,
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: text
          }
        });
        this.$nextTick(() => {
          this.$access.$emit('system:role:change');
        });
      },
      logout() {
        this.$access.reset();
      }
    }
  }
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
</style>
