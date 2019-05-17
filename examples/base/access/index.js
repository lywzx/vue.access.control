import VueAccessControl from "vue.access.control";
import Vue from "vue";

Vue.use(VueAccessControl, {
  foreignKeyName: "user_id",
  notLoginRoleName: "Guest",
  loginRoute: {
    name: "user_login"
  }
});

export default new VueAccessControl.Access();
