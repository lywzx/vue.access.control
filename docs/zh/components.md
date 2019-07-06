# 组件与指令

`VueAccessControl`除了在组件中以`$access`访问，并未提供类`v-if`指令处理鉴权问题，原因`v-if`无法做到，现在有的方案只能生成DOM后，再通过DOM的方法移除。

`VueAccessControl`根据实际场景，为方便使用，实现了指令`v-access-show`，组件`access-router-link`。

## 关于`access-router-link`组件

由于指令是基于`vue-router`，所以必须要在启用路由功能，才能够正常使用。

```js
Vue.use(VueAccessControl, {
    // ...
    useRouter: true
});
```

`access-router-link`指令是对`vue-router`中`router-link`的指令的扩充，会根据路由中配置的`middleware`对当前路由是否有权限`if`判断，也就是相当于在`router-link`中，添加了一个`v-if`来判断当前用户是否拥有当前路由的访问权限。

```vue
<template>
  <router-link :to="{name: 'user_manage'}" v-if="userHasRoutePermission">用户管理</router-link>
</template>
<script>
  export default {
    computed: {
      userHasRoutePermission() {
        let ret = false;
        // ... TODO ADD CHECK LOGIC
        return ret;
      }
    }
  }
</script>
```

以上代码相当于直接使用`access-router-link`；如下：

```vue
<template>
  <access-router-link :to="{name: 'user_manage'}">用户管理</access-router-link>
</template>
<script >
export default {
  
}
</script>
```


## 关于`v-access-show`

`v-access-show`指令是对`vue`自带的`v-show`的扩充，实现了`v-show`的全部功能，并提供了更便捷的方式来用处理权限判断。

### 类`v-show`功能

在现有的项目中，你完全可以直接使用`v-access-show`替换你所使用的`v-show`指令，将不会产生任何副作用。

### 相关的指令表达式

`v-access-show`提供了指令表达式，方便处理权限的验证。表达式支持要支持：`login`、`role`、`can`、`ability`、`owns`。最终是调用的`$access`上对应方法，分别是：`isLogin`、`hasRole`、`can`、`ability`、`owns`；而指令绑定的值最终会作为参数传至对应的方法中。

使用示例如下：

```vue
<template>
  <section>
  
    <!-- 只有超级管理员才显示 -->
    <div v-access-show:role="'administrator'"></div>
    
    <!-- 管理员或老师才显示 -->
    <div v-access-show:role="'administrator|teacher'"></div>
    
    <!-- 管理员及老师才显示：直接数组传参 -->
    <div v-access-show:role="['administrator|teacher', true]"></div>
    
  </section>
</template>
```

上面表达式当中，由于`login`表达式是不需要参数的，所以，不需要传值。

```vue
<template>
  <div>
    <div v-access-show:login>登录后才显示</div>
  </div>
</template>
```

但我们知道，`$access.isLogin()`会返回三种值：

* `true`、已登录
* `flase`、未登录
* `undefined`、未知登录状态

默认情况下，`v-access-show:login`对于未知登录状态时，当作未登录逻辑处理。如果需要改变这个特性，只需要在传递参数中，传入一个`true`；此时，未知登录状态下，组件仍然显示。

```vue
<template>
  <div>
    <div v-access-show:login="true">在未知登录状态下，仍然正常显示</div>
  </div>
</template>
```
