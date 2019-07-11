# 介绍

`VueAccessControl`是基于[`AccessControl`](https://github.com/lywzx/access.control)实现的一套权纯前端的权限管理系统，旨在方便构建纯前端单面应用。组件是无侵入式的，你可以加入部分代码，就可以在你的系统中正常使用了。

## 如何工作？

在启动`Vue`应用的同时，会实例化一个`VueAccessControl`实例，在后续操作过程中，调用`$access.setRole('administrator')`或使用`$access.setPermission('edit_role')`再重新设置角色及权限。当然这些都是响应式的，也就是说，你的视图会随着以上变更发生变化。


## 功能点

* . 鉴权：VueAccessControl提供了基本的鉴权，如`$access.hasRole('administrator')`,`$access.can('edit_role')`,`$access.isLogin()`及一些内置的指令及组件。
* . 中间件：基于`vue-router`的事件钩子，实现了路由中间件功能，可以方便在路由中，鉴权。
* . 事件：除了VueAccessControl提供的部分默认的事件外，你也可以把事件绑定在`$access`实例上。它提供了`VueEventBus`类似的功能。

## 在线预览
[base access](https://www.lyblog.net/docs/vue.access.control/demo/base/index.html)

[route middleware](https://www.lyblog.net/docs/vue.access.control/demo/route-middleware/index.html)

## 示例源码
[base access](https://github.com/lywzx/vue.access.control/tree/dev/examples/base)

[route middleware](https://github.com/lywzx/vue.access.control/tree/dev/examples/route-middleware)

## TODO 

* `ssr`支持及完善的功能测试
* 完善DEMO
* 添加快速接入指南

