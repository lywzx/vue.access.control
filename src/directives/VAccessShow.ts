import { VNode } from 'vue/types/vnode';
import { Vue } from 'vue-property-decorator';
import isString from 'lodash/isString';
import some from 'lodash/some';
import extend from 'lodash/extend';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';

import { Access } from '../Access';
import { assert } from '../util';

const vShow = Vue.directive('show');

function buildFn(fn: Function) {
  let existsModifier = {
    ability: 'ability',
    role: 'hasRole',
    can: 'can',
    login: 'isLogin',
  };
  return function(this: any, $el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode) {
    let componentInstance = vNode.componentInstance;
    if (componentInstance) {
      // @ts-ignore
      let access = componentInstance.$access as Access;
      let modifiers = binding.modifiers;
      let modifierKeys = keys(modifiers);
      if ('value' in binding || 'expression' in binding) {
        if (some(modifierKeys, item => item in existsModifier)) {
          let value = binding.value;
          let args: any[] = [];
          if (isArray(value)) {
            args = value;
          } else if (isString(value)) {
            args = value.split(',').map(function(item) {
              let itemTrim = item.trim();
              let itemToLowercase = itemTrim.toLocaleString();
              if (itemToLowercase === 'false' || itemToLowercase === 'true') {
                return itemToLowercase === 'true';
              }
              return itemTrim;
            });
          } else {
            assert(false, 'directive v-access-show value need a array or string');
          }
          // @ts-ignore
          let result = (modifierKeys.all ? every : some)(modifierKeys, function(item: string) {
            // @ts-ignore
            return access[existsModifier[item]](args[0], args[1]);
          });
          return fn.call(
            this,
            $el,
            extend({}, binding, {
              value: result,
            }),
            vNode,
            oldVNode
          );
        }
      } else if (
        vNode &&
        vNode.componentOptions &&
        vNode.componentOptions.tag &&
        ['router-link', 'access-router-link'].indexOf(vNode.componentOptions.tag) !== -1
      ) {
        // @ts-ignore
        const router = componentInstance.$router;
        // @ts-ignore
        const current = componentInstance.$route;
        // @ts-ignore
        const { route } = router.resolve(componentInstance.to, current, componentInstance.append);
        // @ts-ignore
        let routerMiddleWares = access.accessRouterMiddleware;

        return (
          routerMiddleWares &&
          routerMiddleWares.runMiddleware(
            {
              middleware: route.meta.middleware || [],
              next: (result: boolean | void) => {
                // @ts-ignore
                fn.call(
                  this,
                  $el,
                  extend({}, binding, { value: result === undefined ? true : result }),
                  vNode,
                  oldVNode
                );
              },
              terminal: true,
            },
            router,
            route
          )
        );
      }
    }

    fn.call(this, $el, binding, vNode, oldVNode);
  };
}

export default {
  // @ts-ignore
  bind: buildFn(vShow.bind),
  // @ts-ignore
  unbind: buildFn(vShow.unbind),
  // @ts-ignore
  update: buildFn(vShow.update),
};
