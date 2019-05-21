import { VNode } from 'vue/types/vnode';

export default {
  bind($el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode) {
    if (vNode.elm && vNode.elm.parentElement) {
      vNode.elm.parentElement.removeChild(vNode.elm);
    }
  },
  inserted($el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode) {
    if (vNode.elm && vNode.elm.parentElement) {
      vNode.elm.parentElement.removeChild(vNode.elm);
    }
  },
  update($el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode) {
    if (vNode.elm && vNode.elm.parentElement) {
      vNode.elm.parentElement.removeChild(vNode.elm);
    }
  },
  componentUpdated($el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode) {
    if (vNode.elm && vNode.elm.parentElement) {
      vNode.elm.parentElement.removeChild(vNode.elm);
    }
  },
  unbind($el: HTMLElement, binding: any, vNode: VNode, oldVNode: VNode) {},
};
