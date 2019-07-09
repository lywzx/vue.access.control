<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <a-menu theme="dark" :defaultSelectedKeys="defaultSelectedKeys" :openKeys.sync="openKeys" mode="inline">
        <template v-for="(item, index) in pageMenuItem">
          <!-- start: no sub menu  -->
          <a-menu-item :key="`${index}`" v-if="item.children && !item.children.length">
            <router-link :to="{ name: item.name }">
              <a-icon :type="item.meta.type" v-if="item.meta.type" />
              <span>{{item.meta.title}}</span>
            </router-link>
          </a-menu-item>
          <!-- end: no sub menu -->
          <a-sub-menu :key="`${index}`" v-else>
            <span slot="title">
              <a-icon type="user" />
              <span>{{item.meta.title}}</span>
            </span>
            <a-menu-item v-for="(route, idx) in item.children" :key="`${index}-${idx}`">
              <router-link :to="{ name: route.name }">{{route.meta.title}}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0"  class="flex-auto">
        <div>
          <a-menu
            mode="horizontal"
            :defaultSelectedKeys="['2']"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item key="1">nav 1</a-menu-item>
            <a-menu-item key="2">nav 2</a-menu-item>
            <a-menu-item key="3">nav 3</a-menu-item>
          </a-menu>
        </div>
        <div class="flex-fixed" style="width: 140px;">
          <header-avatar></header-avatar>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <template v-for="(item, index) in currentRouteMenu" >
            <a-breadcrumb-item v-if="item.meta.title" :key="index">
              <router-link :to="{ name: item.name }">{{item.meta.title}}</router-link>
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <router-view></router-view>
        <!--<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>-->
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
  import {
    Layout as ALayout,
    Menu as AMenu,
    Breadcrumb as ABreadcrumb,
    Icon as AIcon,
    Row as ARow,
    Col as ACol,
  } from 'ant-design-vue';
  import {
    find,
    findIndex,
    uniq
  } from 'lodash';
  import HeaderAvatar from './HeaderAvatar';

  export default {
    components: {
      AMenu,
      ALayout,
      ABreadcrumb,
      AIcon,
      ASubMenu: AMenu.SubMenu,
      AMenuItem: AMenu.Item,
      ABreadcrumbItem: ABreadcrumb.Item,
      ALayoutHeader: ALayout.Header,
      ALayoutContent: ALayout.Content,
      ALayoutSider: ALayout.Sider,
      ALayoutFooter: ALayout.Footer,
      ARow,
      ACol,
      HeaderAvatar
    },
    data () {
      return {
        collapsed: false,
        userAddOpenKeys: []
      }
    },
    computed: {
      pageMenuItem() {
        const admin = find(this.$router.options.routes, {path: '/admin'});
        return admin.children;
      },
      currentRouteMenu() {
        return this.$route.matched;
      },
      defaultSelectedKeys() {
        const openKeys = this.openKeys[0];
        const adminMenu = this.pageMenuItem[openKeys];
        const selectIndex = findIndex(adminMenu.children, {name: this.$route.name});
        return [ `${openKeys}-${selectIndex === -1 ? 0 : selectIndex}`];
      },
      openKeys:{
        get() {
          const currentRoute = this.currentRouteMenu[1];
          return uniq([
            `${findIndex(this.pageMenuItem, { name: currentRoute.name })}`
          ].concat(this.userAddOpenKeys));
        },
        set(value) {
          this.userAddOpenKeys = value;
        }
      }
    }
  }
</script>

<style>
  #components-layout-demo-side {
    min-height: 100vh;
  }
  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
  }
</style>
