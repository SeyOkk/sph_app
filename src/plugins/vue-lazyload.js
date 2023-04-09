import Vue from "vue";
import VueLazyload from "vue-lazyload";
const errImg = require("@/assets/images/404.webp");
const loadingImg = require("@/assets/images/loading.gif");

Vue.use(VueLazyload, {
  loading: loadingImg, // 加载时默认显示的图片
  error: errImg, // 加载出错时显示的图片
});
