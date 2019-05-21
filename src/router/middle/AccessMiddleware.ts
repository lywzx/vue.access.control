import MiddlewareInterface from '../../interface/MiddlewareInterface';
import { Route, VueRouter } from 'vue-router/types/router';
import { Access } from '../../Access';

export default function(type: string): MiddlewareInterface {
  return new class AccessMiddleware implements MiddlewareInterface {
    private _isOptional: boolean = false;

    private _isTerminal: boolean = false;

    private args: any[] = [];

    public handle(next: Function, router: VueRouter, to: Route, from: Route): void {
      let app = router.app as { $access?: Access };
      let args = this.args;
      if (app.$access) {
        let access = app.$access as Access;
        let result;
        switch (type) {
          case 'role':
            result = access.hasRole(args[0], args[1] || undefined);
            break;
          case 'permission':
            result = access.hasPermission(args[0], args[1] || undefined);
            break;
          case 'can':
            result = access.hasPermission(args[0], args[1] || undefined);
            break;
          case 'ability':
            result = access.ability(args[0], args[1]);
            break;
        }

        if (result === true || result === false) {
          return next(result);
        }
      }
      next(true);
    }

    public clearArgs() {
      this.args = [];
      return this;
    }

    public setArgs(args: any[]) {
      this.args = args;
      return this;
    }

    public optional(optional: boolean = true) {
      this._isOptional = optional;
      return this;
    }

    public isTerminal(): boolean {
      return this._isTerminal;
    }

    public terminal(terminal: boolean) {
      this._isTerminal = terminal;
      return this;
    }

    public isOptional(): boolean {
      return this._isOptional;
    }
  }();
}
