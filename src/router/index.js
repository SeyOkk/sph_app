import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

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

export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});
