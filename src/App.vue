<template>
  <div id="app">
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 路由组件 -->
    <router-view />
    <!-- 底部组件 根据路由元信息判断是否展示组件-->
    <Footer v-show="$route.meta.isFooterShow"></Footer>
  </div>
</template>

<script>
import {mapActions} from "vuex"

import Header from "./components/header";
import Footer from "./components/footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions(["getCategoryList", "getBanners", "getFloors"])
  },
  created() {
    // 调用三级分类数据接口放在APP根组件处调用，这只会调用一次，
    // 没必要每次实例化进行三级分类组件时调用，提升性能
    // this.$store.dispatch("getCategoryList");
    this.getCategoryList()
    this.getBanners()
    this.getFloors()
  },
};
</script>

<style>
/* 全局引入轮播图样式*/
@import "swiper/css/swiper.min.css";


</style>
