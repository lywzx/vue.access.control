# 快速上手

现阶段，`VueAccessControl`仅支持通过npm安装的方便使用，暂不支持CDN引入，后期会考虑。

## 安装VueAccessControl

```sh
yarn add @lywzx/vue.access.control # or：npm install @lywzx/vue.access.control --save
```

安装完成之后，在`src`目录中，创建一个`access/index.js`文件，调用Vue.use(VueAccessControl)，完成安装。

```js{2}
// src/access/index.js
import Vue from 'vue';
import VueAccessControl from '@lywzx/vue.access.control';

const options = {};
Vue.use(VueAccessControl, options);
```

特别注意：如果需要启用路由的相关功能的话，你需要在`Vue.use(VueAccessControl)`之前调用`Vue.use(VueRouter)`。

## 使用示例

完成安装工作之后，需要创建一个`Access`实例，改动如下：

access/index.js文件完整如下：

```js{2}
import VueAccessControl from '@lywzx/vue.access.control';
import Vue from 'vue';

Vue.use(VueAccessControl, {});

const access =  new VueAccessControl.Access({
  routes: []
});

export default access;
```

编辑`src/main.js`，更改`new Vue`如下

```js
import Vue from 'vue';
import access from './access/index';

new Vue({
    // ... other like store, router ...
    access, 
}).$mount('#app');
```
    

在登录完成，获取到用户角色及权限时，你可以像如下方式设置角色及权限

```js
// Login.vue

// ....
    
    methods: {
        login{} {
            api.login({
                // ...
            }).then(( {role, permissions}) => {
                // 设置角色
                this.$access.setRole(role);
                // 设置对应的权限
                this.$access.setPermissions(permissions);
            });
        }
    }
```
   
设置完权限后，就可以在组件中，正常进行鉴权了。

## 组件中应用

在组件中，可以使用$access来访问`VueAccessControl`权限管理实例。可以使用`can`、`hasRole`、`ability`等访问来判断当前用户是否包含权限。

```vue
<template>
    <div>
        <router-link to='admin/manage' v-if="$access.hasRole('admin')">后台管理</router-link>
        <router-link to='admin/user/manage' v-show="$access.can('edit_user_info')">编辑用户信息</router-link>
    </div>
</template>
```

当然，你也可以在对应方法中，去做判断，像如下代码：

```js
export default {
    method: {
        comment() {
            if (this.$access.hasRole('admin')) {
                // ...
            }
        }
    }
}
```

## 为什么不提供v-if-role等v-on:can等类似指令及组件？

由于`v-if`类指令，是`vue`内部指令，在不更改`Vue`源代码的情况下，只能模拟，不能实现真正的此功能；所以考虑只直接使用`v-if`配合`$access`使用也许更合适。
