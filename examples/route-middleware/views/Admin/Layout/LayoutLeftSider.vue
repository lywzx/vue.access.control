<template>
  <a-layout-sider
    collapsible
    v-model="collapsed"
  >
    <a-spin :spinning="userRouterPermission.isLoading">
      <div class="logo" />
      <a-menu theme="dark" :defaultSelectedKeys="defaultSelectedKeys" :openKeys.sync="openKeys" mode="inline">
        <template v-for="(item, index) in pageMenuItem">
          <!-- start: no sub menu  -->
          <a-menu-item :key="`${index}`" v-if="item.children && !item.children.length && userRouterPermission.mapping[item.name]">
            <router-link :to="{ name: item.name }">
              <a-icon :type="item.meta.type" v-if="item.meta.type" />
              <span>{{item.meta.title}}</span>
            </router-link>
          </a-menu-item>
          <!-- end: no sub menu -->
          <a-sub-menu :key="`${index}`" v-else-if="userRouterPermission.mapping[item.name]">
            <span slot="title">
              <a-icon type="user" />
              <span>{{item.meta.title}}</span>
            </span>
            <template v-for="(route, idx) in item.children" >
              <a-menu-item :key="`${index}-${idx}`" v-if="userRouterPermission.mapping[route.name]" >
                <router-link :to="{ name: route.name }">{{route.meta.title}}</router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-spin>
  </a-layout-sider>
</template>
<script type="text/ecmascript-6">
  import {
    Icon as AIcon,
    Layout as ALayout,
    Menu as AMenu,
    Spin as ASpin
  } from 'ant-design-vue';
  import {
    uniq,
    findIndex,
    find,
    extend,
    each,
    get,
  } from 'lodash';

  export default {
    components: {
      ASpin,
      AMenu,
      ALayout,
      AIcon,
      ASubMenu: AMenu.SubMenu,
      AMenuItem: AMenu.Item,
      ALayoutSider: ALayout.Sider,
    },
    data() {
      return {
        collapsed: false,
        userAddOpenKeys: [],
        userRouterPermission: {
          isLoading: true,
          mapping: {}
        }
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
    },
    methods: {
      initPagePermission() {
        const router = this.$router;
        let routes = [];
        each(this.pageMenuItem, (route) => {
          routes.push({
            name: route.name
          });
          if (route.children && route.children.length) {
            routes = routes.concat(route.children);
          }
        });

        this.userRouterPermission.isLoading = true;
        Promise.all(routes.map((it) => {
          return this.$access.isCanTo(router, {
            name: it.name
          }).then((result)=>{
            return {
              [it.name]: result
            }
          });
        })).then((args) => {
          this.userRouterPermission.isLoading = false;
          this.userRouterPermission.mapping = args.reduce((last, next)=> {
            return Object.assign(last, next);
          }, {});
        })
      }
    },
    created() {

      this.initPagePermission();


      this.$access.$on('system:role:change', () => {
        this.initPagePermission();
      });
    },
    beforeDestroy() {
      this.$access.$off('system:role:change');
    }
  }
</script>
<style lang="less" scoped>
  .ant-spin-nested-loading {
    height: 100vh;
  }
</style>
