import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import TypeNav from "@/components/TypeNav";

Vue.config.productionTip = false;

// 将TypeNav三级分类组件注册为全局组件
Vue.component("TypeNav", TypeNav);

const vm = new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

console.log(vm);
