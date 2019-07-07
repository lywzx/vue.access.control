import { VNode} from 'vue/types/vnode';
import { Vue } from 'vue-property-decorator';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import { assert } from '../util';
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

function getResultValue($el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode) {
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
        return access.isLogin() === value;
      } else {
        return value;
      }
    }

    return (access as any)[(existsModifier as any)[binding.arg]](...value);
  }

  return binding.value;
}

export default {
  bind: function(this: any, $el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
    const value = getResultValue($el, binding, vnode, oldVnode);
    // @ts-ignore
    binding.value = value;
    (vShow.bind as Function).call(this, $el, binding, vnode, oldVnode);
  },
  // @ts-ignore
  unbind: function(this: any, $el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
    const value = getResultValue($el, binding, vnode, oldVnode);
    // @ts-ignore
    binding.value = value;
    (vShow.unbind as Function).call(this, $el, binding, vnode, oldVnode);
  },
  // @ts-ignore
  update: function(this: any, $el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
    const value = getResultValue($el, binding, vnode, oldVnode);
    // @ts-ignore
    binding.value = value;
    (vShow.update as Function).call(this, $el, binding, vnode, oldVnode);
  },
};
