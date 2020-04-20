# Introduction

`vue access control` is base on the package [`@lywzx/access.control`](https://github.com/lywzx/access.control) for vue application access control.

[![Build Status](https://img.shields.io/travis/lywzx/vue.access.control/master.svg)](https://travis-ci.org/lywzx/vue.access.control)
[![codecov](https://codecov.io/gh/lywzx/vue.access.control/branch/master/graph/badge.svg)](https://codecov.io/gh/lywzx/vue.access.control)
[![NPM version](https://img.shields.io/npm/v/@lywzx/vue.access.control.svg?style=flat-square)](https://www.npmjs.com/package/@lywzx/vue.access.control)
[![NPM downloads](https://img.shields.io/npm/dm/@lywzx/vue.access.control.svg?style=flat-square)](https://www.npmjs.com/package/@lywzx/vue.access.control)
[![Known Vulnerabilities](https://snyk.io/test/github/lywzx/vue.access.control/badge.svg?targetFile=package.json)](https://snyk.io/test/github/lywzx/vue.access.control?targetFile=package.json)
[![License](https://img.shields.io/npm/l/@lywzx/vue.access.control.svg?sanitize=true)](https://www.npmjs.com/package/@lywzx/vue.access.control)
[![Dependency Status](https://david-dm.org/lywzx/vue.access.control.svg)](https://david-dm.org/lywzx/vue.access.control)
[![devDependencies Status](https://david-dm.org/lywzx/vue.access.control/dev-status.svg)](https://david-dm.org/lywzx/vue.access.control?type=dev)

# Getting Started

## Installation

```sh
# install
yarn add @lywzx/vue.access.control # or：npm install @lywzx/vue.access.control --save
```

When used with a module system, you must explicitly install VueAccessControl via `Vue.use()`;

```js
import VueAccessControl from '@lywzx/vue.access.control';
Vue.use(VueAccessControl, {});
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build vue.access.control yourself if you want to use the latest dev build.

```sh
git clone https://github.com/lywzx/vue.access.control.git node_modules/@lywax/vue.access.control
cd node_modules/@lywax/vue.access.control
npm install
npm run build
```

## use examples

after you correct install. you should new a AccessControl.

```js
// src/access/index.js
import VueAccessControl, { LoginMiddleware, RouterMiddleware } from '@lywzx/vue.access.control';
import Vue from 'vue';

Vue.use(VueAccessControl);
const access = new VueAccessControl();

export default access;
```

then you change root vue component.

```js
// src/main.js
import access from './access/index';

new Vue({
  access,
}).$mount('#app');
```

in you component, `$access` variable you will visited.

### check role or permission

```html
<!-- check role -->
<div v-if="$access.hasRole('administrator')"></div>

<!-- check permission -->
<div v-if="$access.can('edit_post')"></div>
```

### route middleware

if you has used `vue-router`, you may need router middleware for you application. When you use VueAccessControl, please enable useRouter.

```js
Vue.use(VueAccessControl, {
  vueRouter: true,
});
```

the code should below `Vue.use(vueRouter)`

add these code to you router

```js
import VueRouter from 'vue-router';
import { afterEach, beforeEach } from '@lywzx/vue.access.control';

//...

const Router = new VueRouter({
  // ...
});

// add code like this
Router.beforeEach(beforeEach.bind(Router));
Router.afterEach(afterEach.bind(Router));
```

if user must login when visit the page, you can do like this.

```js
{
    name: 'user_index',
    path: 'user/index',
    meta: {
        middleware: ['login']
    }
}
```

only administrator can access

```js
{
    name: 'user_manage',
    path: 'admin/user',
    meta: {
        middleware: ['login', 'role:administrator']
    }
}
```

# Learn More

[VueAccessControl document](https://www.lyblog.net/docs/vue.access.control/)

# Examples preview

[base access](https://www.lyblog.net/docs/vue.access.control/demo/base/index.html)

[route middleware](https://www.lyblog.net/docs/vue.access.control/demo/route-middleware/index.html)

# Examples codes

[base access](https://github.com/lywzx/vue.access.control/tree/dev/examples/base)

[route middleware](https://github.com/lywzx/vue.access.control/tree/dev/examples/route-middleware)
