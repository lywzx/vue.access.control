import { NavigationGuard } from "vue-router/types/router";

export default interface MiddleWares {
  [t: string]: NavigationGuard
}
