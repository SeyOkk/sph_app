import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import TypeNav from "@/components/TypeNav";

Vue.config.productionTip = false;

// 将TypeNav三级分类组件注册为全局组件
Vue.component("TypeNav", TypeNav);

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    // 原型对象上挂载事件总线
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
