import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入mock数据
import "./mock/MockServer";
// 引入全局组件
import "@/components/ComponentRegister";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    // 原型对象上挂载事件总线
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
