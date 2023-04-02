import Home from "@/pages/home/index.vue";
import Login from "@/pages/login/index.vue";
import Register from "@/pages/register/index.vue";
import Search from "@/pages/search/index.vue";
import Detail from "@/pages/detail/index.vue";
import AddCartSuccess from "@/pages/shopcart/AddCartSuccess.vue";
import ShopCart from "@/pages/shopcart/index.vue";

export default [
  {
    path: "*",
    redirect: "/home",
  },
  {
    name: "home",
    path: "/home",
    component: Home,
    meta: {
      isFooterShow: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      isFooterShow: false,
    },
  },
  {
    name: "register",
    path: "/register",
    component: Register,
    meta: {
      isFooterShow: false,
    },
  },
  {
    name: "search",
    // :keyword? 表示params参数 keyword 非必传
    path: `/search/:keyword?`,
    component: Search,
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
  {
    name: "detail",
    path: "/detail/:id",
    component: Detail,
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
  {
    name: "AddCartSuccess",
    path: "/AddCartSuccess/:skuNum",
    component: AddCartSuccess,
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
  {
    name: "ShopCart",
    path: "/shopCart",
    component: ShopCart,
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
];
