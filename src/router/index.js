import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 重写路由跳转push、replace方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (localtion, resovle, reject) {
  if (resovle && reject) {
    originPush.call(this, localtion, resovle, reject);
  } else {
    originPush.call(
      this,
      localtion,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (localtion, resovle, reject) {
  if (resovle && reject) {
    originReplace.call(this, localtion, resovle, reject);
  } else {
    originReplace.call(
      this,
      localtion,
      () => {},
      () => {}
    );
  }
};

import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Search from "@/pages/search";
import Detail from "@/pages/detail";

export default new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/home",
    },
    {
      name: "home",
      path: "/home",
      component: Home,
      meta: {
        isFooterShow: true,
      },
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: {
        isFooterShow: false,
      },
    },
    {
      name: "register",
      path: "/register",
      component: Register,
      meta: {
        isFooterShow: false,
      },
    },
    {
      name: "search",
      // :keyword? 表示params参数 keyword 非必传
      path: `/search/:keyword?`,
      component: Search,
      meta: {
        isFooterShow: true,
      },
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail,
      meta: {
        isFooterShow: true,
      },
    },
  ],
});
