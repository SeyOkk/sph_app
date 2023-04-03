import Vuex from "vuex";
import Vue from "vue";

// 作为vue的插件进行使用
Vue.use(Vuex);

import home from "./home";
import search from "./search";
import detail from "./detail";
import cart from "./cart";
import user from "./user";

// 创建一个vuex实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    cart,
    user,
  },
});
