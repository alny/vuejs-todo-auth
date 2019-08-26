import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("../views/Login")
    },
    {
      name: "tasks",
      path: "/tasks",
      component: () => import("../views/Task")
    },
    {
      name: "register",
      path: "/register",
      component: () => import("../views/Register")
    }
  ]
});
