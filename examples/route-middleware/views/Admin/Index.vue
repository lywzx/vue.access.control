<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <layout-left-slider></layout-left-slider>
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
        <div class="flex-fixed" style="width: 220px;">
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
    Menu as AMenu,
    Layout as ALayout,
    Breadcrumb as ABreadcrumb,
    Icon as AIcon,
    Row as ARow,
    Col as ACol,
  } from 'ant-design-vue';
  import HeaderAvatar from './HeaderAvatar';
  import LayoutLeftSlider from './Layout/LayoutLeftSider';

  export default {
    components: {
      AMenu,
      ASubMenu: AMenu.SubMenu,
      AMenuItem: AMenu.Item,
      ALayout,
      ABreadcrumb,
      AIcon,
      ABreadcrumbItem: ABreadcrumb.Item,
      ALayoutHeader: ALayout.Header,
      ALayoutContent: ALayout.Content,
      ALayoutSider: ALayout.Sider,
      ALayoutFooter: ALayout.Footer,
      ARow,
      ACol,
      HeaderAvatar,
      LayoutLeftSlider
    },
    data () {
      return {

      }
    },
    computed: {
      currentRouteMenu() {
        return this.$route.matched;
      },
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
