export default [
  {
    path: "*",
    redirect: "/home",
  },
  {
    name: "home",
    path: "/home",
    component: () => import("@/pages/home/index.vue"),
    meta: {
      isFooterShow: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      isFooterShow: false,
    },
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/pages/register/index.vue"),
    meta: {
      isFooterShow: false,
    },
  },
  {
    name: "search",
    // :keyword? 表示params参数 keyword 非必传
    path: `/search/:keyword?`,
    component: () => import("@/pages/search/index.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
  {
    name: "detail",
    path: "/detail/:id",
    component: () => import("@/pages/detail/index.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
  {
    name: "AddCartSuccess",
    path: "/AddCartSuccess/:skuNum",
    component: () => import("@/pages/shopcart/AddCartSuccess.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
  {
    name: "ShopCart",
    path: "/shopCart",
    component: () => import("@/pages/shopcart/index.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
    },
  },
  {
    name: "Trade",
    path: "/trade",
    component: () => import("@/pages/trade/index.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
      isLogin: true,
    },
    beforeEnter(to, from, next) {
      from.path.includes("/shopCart") ? next() : next(false);
    },
  },
  {
    name: "Pay",
    path: "/pay",
    component: () => import("@/pages/pay/index.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
      isLogin: true,
    },
    beforeEnter(to, from, next) {
      from.path.includes("/trade") ? next() : next(false);
    },
  },
  {
    name: "PaySuccess",
    path: "/PaySuccess",
    component: () => import("@/pages/pay/PaySuccess.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
      isLogin: true,
    },
    beforeEnter(to, from, next) {
      from.path.includes("/pay") ? next() : next(false);
    },
  },
  {
    name: "Center",
    path: "/center",
    component: () => import("@/pages/center/index.vue"),
    meta: {
      isFooterShow: true,
      typeNavFlag: true,
      isLogin: true,
    },
    children: [
      {
        path: "",
        redirect: "my-order",
      },
      {
        path: "my-order",
        component: () => import("@/pages/center/MyOrder.vue"),
        meta: {
          isLogin: true,
        },
      },
    ],
  },
];
