import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入mock数据
import "./mock/MockServer";
// 引入全局组件
import "@/components/ComponentRegister";
// 引入api
import * as api from "@/api/AllApi";
// 按需引入element-ui
import "./plugins/element-ui";
// 引入图片懒加载插件
import "./plugins/vue-lazyload";

Vue.config.productionTip = false;

let vm = new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    // 原型对象上挂载事件总线
    Vue.prototype.$bus = this;
    // 原型对象上挂载api
    Vue.prototype.$api = api;
  },
}).$mount("#app");

export default vm;
