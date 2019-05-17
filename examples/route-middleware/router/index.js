import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { afterEach, beforeEach } from "vue.access.control";

Vue.use(VueRouter);

const router = new VueRouter({
  base: "/route-middleware",
  routes
});

router.beforeEach(beforeEach.bind(router));

router.afterEach(afterEach.bind(router));

export default router;
