import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import TypeNav from '@/pages/home/TypeNav'

Vue.config.productionTip = false;

// 将TypeNav三级分类组件注册为全局组件
Vue.component('TypeNav', TypeNav)

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
