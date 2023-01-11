<template>
  <div id="app">
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 路由组件 -->
    <router-view/>
    <!-- 底部组件 根据路由元信息判断是否展示组件-->
    <Footer v-show="$route.meta.isFooterShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/header";
import Footer from "./components/footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
