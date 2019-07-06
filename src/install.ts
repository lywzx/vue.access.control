import { CommonDirectives, DependencyVueRouterDirectives } from './directives/index';
import { CommonComponents, DependencyVueRouterComponents, DependencyComponentsReferences } from './components/index';
import { Vue as VueConstructor } from 'vue-property-decorator';
import each from 'lodash/each';
import extend from 'lodash/extend';
import { assert } from './util';
import { DirectiveOptions } from 'vue/types/options';

export const installFn = function(Vue: typeof VueConstructor, useRouter?: boolean) {
  const registryDirective = function(value: DirectiveOptions, name: string): void {
    Vue.directive(name, value);
  };
  // registry directives
  each(CommonDirectives, registryDirective);

  if (useRouter) {
    // registry directives dependency vue-router
    each(DependencyVueRouterDirectives, registryDirective);
  }

  // registry components
  each(CommonComponents, function(value, name: string) {
    Vue.component(name, value);
  });

  //
  if (useRouter) {
    each(DependencyVueRouterComponents as { [s: string]: DirectiveOptions }, function(
      value: DirectiveOptions,
      name: string
    ) {
      let denpendency: any;
      if (name in DependencyComponentsReferences) {
        denpendency = (DependencyComponentsReferences as Record<string, any>)[name];
        let dependencyComponent: any;
        for (let item of denpendency) {
          dependencyComponent = Vue.component(item);
          if (dependencyComponent) {
            break;
          }
        }
        assert(!!dependencyComponent, 'please call method Vue.use(VueRouter) before Vue.use(VueAccessControl)');
        value = extend(value, {
          extends: dependencyComponent,
        });
      }
      Vue.component(name, value);
    });
  }
};
