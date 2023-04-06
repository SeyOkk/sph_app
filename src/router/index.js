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
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

vueRouter.beforeEach((to, from, next) => {
  // 判断用户是否带有token
  const token = getToken();
  if (token) {
    // 查看本地存储的用户信息是否存在
    const userInfo = getUser();
    let flag = false;
    if (!userInfo) {
      // 重新发送数据请求获取用户信息
      store
        .dispatch("getUserInfo")
        .then((res) => {
          console.log("获取用户信息成功");
          flag = true;
        })
        .catch((err) => {
          console.log("获取用户信息失败");
        });
    }
    if ((to.path === "/login" || to.path === "/register") && flag) {
      next(from.path);
    } else {
      next();
    }
  } else {
    // todo 暂时全放行
    next();
  }
});

export default vueRouter;
