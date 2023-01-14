import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入mock数据
import "./mock/MockServer"

import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";

Vue.config.productionTip = false;

// 将TypeNav三级分类组件注册为全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel)

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    // 原型对象上挂载事件总线
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
