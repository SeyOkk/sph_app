import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Search from "@/pages/search";

export default new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/search",
      component: Search,
    },
  ],
});
