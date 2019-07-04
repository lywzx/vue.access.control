# 使用路由中间件功能

`VueAccessControl`默认提供了登录，鉴权中间件，使用路由相关功能，也比较简单。

首先，开启`VueAccessControl`的路由功能。

``` js{2}
Vue.use(VueAccessControl, {
    globalMiddleware: ['login?'], // 定义默认的中间件
    useRouter: true
});
```

然后，你就可以直接在路由中使用了。
使用方法也是很简单的，你只需要在路由中`meta`中，添加`middleware`字段，是数组类型。

``` js{2}
export const routes = [
    {
        name: 'app',
        path: 'public',
        component: () => import('../views/PublicApp.vue'),
        meta: {
            middleware: []
        },
        children: [
            {
                name: 'user_center',
                path: 'user/center/',
                component: () => import('../views/public/user/center.vue'),
                meta: {
                    middleware: ['login', 'role:teacher|student'],      // 强制登录，用角色为教师或学生
                }
            }
            // ...
        ]
    },
    {
        name: 'admin_manage_app',
        path: 'admin',
        meta: {
            middleware: ['login', 'role:administrator|editor', 'can:edit_user_info'] // 强制登录，角色为管理员或编辑，且需要用编辑用户信息权限
        }
    }
];
```

现在，中间件尚未生效，你需要在路由的`beforeEach`及`afterEach`中启用他，代码如下：

``` js{2}
// routes.js
import { afterEach, beforeEach } from '@lywzx/vue.access.control';


const Router = new VueRouter({
   // ...
   
});

Router.beforeEach(beforeEach.bind(Router));
Router.afterEach(afterEach.bind(Router));
```

特别注意，`beforeEach`及`afterEach`需要调用`bind(Router)`之后传入到事件钩子中。


## `login`中间件

`VueAccessControl`中`login`中间件，如果要正常使用的话，需要稍加配置才可以。

在路由中的使用，只需要在`middleware`配置中，添加`login`即可。如果某个页面，即可以登录，也可不登录，则可以设置为`login?`。

通常需要在任意页面时，都需要同步登录状态，所以一般会把`login?`放到全局中间件当中。

### 完善`handleExtend`方法

完善`LoginMiddleware.handleExtend`方法。

``` js{2}
import { LoginMiddleware } from '@lywzx/vue.access.control';

LoginMiddleware.handleExtend = function(next) {
    // user is login
    if ( ... ) {
        next(true);
    } else {
        next(false);
    }
}
```
    
`handleExtend`方法，是代码不确定用户是否登录时，会调用的。这个方法，只会在应用首次判登录时，才会调用。若后期，登录状态变更，需要调用`$access.reset()`方法重置登录状态。

这个方法一般会用在应用启动时，恢复当前登录状态及权限信息时，调用。下面是一个完整的登录示例。

下面`User.js`是一个用户登录及注册相关的服务，如下

``` js{2}
// src/service/User.js
export class User {

    static model = {
        login: null,
        logout: null,
        userInfo: null
    }

    /**
     * @type Access
     */
    static $access;

    // 用户登录
    static login(data) {
        return User
            .model
            .login
            .post(data)
            .then(() => {
                // 
                User.$access.reset();
            });
    }
    
    // 刷新登录信息，这个方法可以获取至当前登录用户的角色及权限等信息
    static freshLogin(force = false) {
        let access = User.$access;
        let isLogin = access.isLogin(); // undefined 表示登录信息尚未初始化
        
        if (isLogin === undefined || force) {
          return User
            .model
            .userInfo
            .getInstance()
            .execute().then((result)=>{
            
               // 把信息放到access当中，类似vuex状态管理，在组件中，可以通过`computed`再获取到信息 
               // computed: {
               //    user() { return this.$access.getExtendInfo('userInfo');}
               // }
               //
              access.setExtendInfo({
                'userInfo': result
              });
              // 配置登录用户的角色用对应的权限信息
              access.setLoginUserInfo({
                roles: result.roles,
                permissions: result.permissions,
                // $access.own() 方法，会用到此字段
                userId: result.id,
              });
              return result;
            }).catch((err) => {
              return Promise.reject(err);
            });
        } else if (isLogin === true) {
          return Promise.resolve(access.getExtendInfo('userInfo'))
        } else {
          return Promise.reject();
        }
    }
    
    // 用户退出登录
    static logout() {
        const access = User.$access;
        return User
            .model
            .logout
            .post()
            .then((result)=>{
                // 重置登录状态
                access.reset();
                // 清空登录信息
                access.setExtendInfo({
                  'userInfo': {}
                });
                return result;
            });
    }
}
```

对应`handleExtend`方法，可以修改成以下代码

``` js{2}
LoginMiddleware.handleExtend = function(next) {
    // user is login
    // next 中 true 表示用户已登录，而 false表示用户未登录，与路由跳转时不同
    User.freshLogin().then(() => next(true)).catch(() => next(false));
}
```


### 完善`notLoginWithTips`方法(这个方法可以不完善)

某些场景下，用户未登录时，需要弹出未登录提示，引导用户去登录，`login`中间件提供了`notLoginWithTips`方法，在未登录时，可以用来引导用户跳转登录页，如下：
    
``` js{2}
import { MessageBox } from 'element-ui';

LoginMiddleware.notLoginWithTips = function(next) {
    MessageBox.confirm('您尚未登录，点击确定立即登录?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         next(true);
       }).catch(() => {
         next(false);     
       });
};
```

## `role`中间件 

很明显，`role`中间件就是用来判断角色的。他实际调用的也是`$access`上的`hasRole`方法。通常使用方法如下：

``` js{2}
middleware: ['login', 'role:admin'],    // 必须要管理员

middleware: ['login', 'role:admin|editor'],  // 管理员或者编辑

middleware: ['login', 'role:admin|editor,true'], // 同时具备管理员编辑角色
```


## `can`中间件

`can`中间件，通用是用来判断是否拥有某个权限或某一类权限，当然，也支持角色的判断。实际调用时，其实是通过`$access`上的`can`方法实现。示例如下：


``` js{2}
middleware: ['login', 'can:update_article'],    // 有更新文章的权限

middleware: ['login', 'can:update_article|delete_article'],   // 有更新文章或删除文件的权限

middleware: ['login', 'can:update_article|delete_article,true'], // 同时有更新及删除文章权限
```
    
    

有时，可能需要判断用户同时有某个角色或某些权限，组件`role`中件虽然可以实现，但是一个`can`中间件实现会更加简单。如下：


``` js{2}
middleware: ['login', 'can:admin.update_article'],  // 拥有管理员身份，且有update_article的权限

middleware: ['login', 'can:admin.*|delete_article'], // 是管理员或有删除文章权限
```

## `ability`中间件

`ability`调用的是`$access`的`ability`方法，总共接收三个参数，第一个是角色，支持以`|`传多个角色；第二个参数是权限，支持多个权限组合；第三个参数，仅支持`requiredAll`字符串，传了即表示角色及权限需要同时满足，才返回`True`;

``` js{2}
middleware: ['login', 'ability:admin,update_article']

middleware: ['login', 'ability:admin,update_article,requiredAll']
```

## 创建自已的中间件
    

如果你需要创建属于自已的中间件，你只需要继承`MiddlewareHandle`类，如果你使用`typescript`书写，你选择实现`MiddlewareInterface`接口，以方便代码提示。

下面是一个例子，用户必须完善某些信息之后，才可以进入页面进行操作。如下:

``` typescript{2}
import { MiddlewareHandle } from '@lywzx/vue.access.control';
import MiddlewareInterface from '@lywzx/vue.access.control/dist/typings/interface/MiddlewareInterface';

class CompleteUserInfo extend MiddlewareHandle implements MiddlewareInterface {

    public handle(next: (opt: boolean | any), { router, to, from, access }: MiddlewareHandleOptions) {
        const userInfo = access.getExtendInfo('userInfo');
        if (!userInfo.avatar) {
            // 如果没有头像，赠跳转至用户信息页面，引导用户完善信息
            next({
                name: 'complete_user_info'   
            });
            return ;
        }
        next(true);
    }
}
```

### 关于中间件的运行模式

为了方便使用，基于路由扩展了一个组件一个指令。`v-access-show`指令与`access-router-link`组件。它们有一个功能，基于当前路由是否有访问权限，来自动显示与隐藏；基实现原理时，在渲染这个页面时，会自动执行中间件逻辑。所以你希望你的中间件支持这个特性的话，需要在`terminal`模式下，不要弹出提示，也不要去处理路由的跳转等操作，仅在`next`方法回调中，回传`boolean`值。

你可以通过`isTerminal()`方法来判断是否在路由显示鉴权模式中。同理，如果你的中间件，需要处理可选模式，就像`login?`；你可以通过`isOptional()`方法，来针对可选操作逻辑进行处理。
