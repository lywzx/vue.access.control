import { VNode } from 'vue/types/vnode';
import { Vue } from 'vue-property-decorator';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import { assert, isPromiseLike } from '../util';
import { stringToArrayArgs } from '../util';
import { DirectiveBinding } from 'vue/types/options';

const vShow = Vue.directive('show');
const existsModifier = {
  ability: 'ability',
  role: 'hasRole',
  can: 'can',
  owns: 'owns',
  login: 'isLogin',
};

function getResultValue($el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode): boolean | Promise<boolean> {
  const context = vNode.context as Vue;
  const access = context.$access;

  if ('arg' in binding && binding.arg in existsModifier) {
    let value = 'value' in binding ? binding.value : false;

    assert(
      isString(value) || isArray(value) || isBoolean(value),
      `when v-access-show used arg equal ${binding.arg}, the value should be string or array or boolean`
    );

    if (isString(value)) {
      value = stringToArrayArgs(value);
    }

    if (isBoolean(value)) {
      if (binding.arg === 'login') {
        const loginStatus = access.isLogin();
        if (binding.value === true) {
          return loginStatus === true;
        }
        return loginStatus === undefined || loginStatus;
      } else {
        return value;
      }
    }

    return (access as any)[(existsModifier as any)[binding.arg]](...value);
  }

  if (
    vNode.componentOptions &&
    vNode.componentOptions.tag === 'router-link' &&
    vNode.componentInstance &&
    (vNode.componentInstance as any).to
  ) {
    return access.isCanTo(context.$router, (vNode.componentInstance as any).to);
  }

  return binding.value;
}

export default {
  bind: function(this: any, $el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
    const value = getResultValue($el, binding, vnode, oldVnode);
    const fu = (result: boolean) => {
      // @ts-ignore
      binding.value = result;
      (vShow.bind as Function).call(this, $el, binding, vnode, oldVnode);
    };
    if (isPromiseLike(value)) {
      (value as Promise<boolean>).then(fu);
    } else {
      fu(value as boolean);
    }
  },
  // @ts-ignore
  unbind: function(this: any, $el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
    const value = getResultValue($el, binding, vnode, oldVnode);
    const fu = (result: boolean) => {
      // @ts-ignore
      binding.value = result;
      (vShow.bind as Function).call(this, $el, binding, vnode, oldVnode);
    };
    if (isPromiseLike(value)) {
      (value as Promise<boolean>).then(fu);
    } else {
      fu(value as boolean);
    }
  },
  // @ts-ignore
  update: function(this: any, $el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
    const value = getResultValue($el, binding, vnode, oldVnode);
    const fu = (result: boolean) => {
      // @ts-ignore
      binding.value = result;
      (vShow.bind as Function).call(this, $el, binding, vnode, oldVnode);
    };
    if (isPromiseLike(value)) {
      (value as Promise<boolean>).then(fu);
    } else {
      fu(value as boolean);
    }
  },
};
