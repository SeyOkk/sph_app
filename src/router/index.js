import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { getToken, getUser } from "@/utils/TokenUtils";
import store from "@/store/index";

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

let vueRouter = new VueRouter({
  base: "/sph_app",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

vueRouter.beforeEach(async (to, from, next) => {
  // 判断用户是否带有token
  const token = getToken();
  if (token) {
    // 查看本地存储的用户信息是否存在
    const userInfo = getUser();
    if (!userInfo) {
      // 重新发送数据请求获取用户信息
      await store.dispatch("getUserInfo");
    }
    if (to.path === "/login" || to.path === "/register") {
      next(from.path);
    } else {
      next();
    }
  } else {
    if (to.meta.isLogin) {
      next(false);
    } else {
      next();
    }
  }
});

export default vueRouter;
