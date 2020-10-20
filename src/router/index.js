import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "/",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Home")
  }
];

const router = new VueRouter({
  routes
});

export default router;
