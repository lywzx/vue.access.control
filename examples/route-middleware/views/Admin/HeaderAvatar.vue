<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <template v-if="$access.isLogin()">
        <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
        <span>{{currUser.name}}</span>
      </template>
      <template v-else>
        <span @click="setUser(dropMenu[0][0], 'Administrator')">go to login</span>
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
  import { User } from '../../service/User';
  import acl from '../../data/acl.json';

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
          acl.map((it)=>({
            method: "setUser",
            ...it
          })),
          [
            {
              method: 'logout',
              icon: 'poweroff',
              text: 'logout'
            }
          ]
        ];
      }
    },
    methods: {
      handleMenuClick(item) {
        const it = item.item.$attrs.item;
        this[it.method](it, it.text);
      },
      setUser( role, text ) {
        //this.$access.setRole(role);
        this.$access.setLoginUserInfo({
          isLogin: true,
          userId: 1,
          roles: [{
            role: role.role,
            permissions: role.permission
          }],
          permissions: []
        });
        this.$access.setExtendInfo({
          userInfo: {
            role: role.text,
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: text
          }
        });

        this.$nextTick(() => {
          this.$access.$emit('system:role:change');
        });
      },
      logout() {
        User.logout().then(() => {
          this.$access.$emit('access:user:logout', true, this.$router);
        });
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
