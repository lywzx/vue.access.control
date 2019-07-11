import { CreateElement, VNode } from 'vue/types/index';
import { RawLocation } from 'vue-router';

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
      let access = this.$access;

      access
        // @ts-ignore
        .isCanTo(router, this.to as RawLocation, this.$route, this.append as boolean)
        // @ts-ignore
        .then((result: boolean) => (this.hasPermission = result));
    },
  },
  mounted() {
    // @ts-ignore
    this.initPermission();
  },
};

export default AccessRouterLink;
