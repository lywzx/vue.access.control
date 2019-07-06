import { CreateElement, VNode } from 'vue/types/index';

const AccessRouterLink = {
  name: 'AccessRouterLink',
  extends: 'router-link',
  data() {
    return {
      hasPermission: true,
    };
  },
  render(createElement: CreateElement): VNode {
    // @ts-ignore
    return (this.hasPermission as boolean)
      ? createElement(
          'router-link',
          {
            // @ts-ignore
            props: this._props,
          },
          // @ts-ignore
          this.$slots.default
        )
      : null;
  },
  watch: {
    '$access.accessData.userOptions': {
      handler() {
        // @ts-ignore
        this.initPermission();
      },
      deep: true,
    },
  },
  methods: {
    initPermission(): void {
      // @ts-ignore
      const router = this.$router;
      // @ts-ignore
      const current = this.$route;
      // @ts-ignore
      const { route } = router.resolve(this.to, current, this.append);
      // @ts-ignore
      let access = this.$access;
      let routerMiddleWares = access.accessRouterMiddleware;
      routerMiddleWares.runMiddleware(
        {
          middleware: route.meta.middleware || [],
          next: (result: boolean | void) => {
            // @ts-ignore
            this.hasPermission = result === undefined;
          },
          terminal: true,
        },
        router,
        route
      );
    },
  },
  mounted() {
    // @ts-ignore
    this.initPermission();
  },
};

export default AccessRouterLink;
