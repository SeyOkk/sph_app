import {
  getCartList,
  addShopCart,
  removeShopCart,
  changeCheckCart,
} from "@/api/cart";

const state = {
  cartList: [],
};

const mutations = {
  GET_CART_LIST(state, payload) {
    state.cartList = payload;
  },
};

const actions = {
  async getCartList({ commit }) {
    let result = await getCartList();
    commit("GET_CART_LIST", result.data);
  },
  async saveShopCart({ commit }, { skuId, skuNum }) {
    let res = await addShopCart(skuId, skuNum);
    if (res.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("保存商品至购物车失败"));
    }
  },
  async removeShopCart({ commit }, { skuId }) {
    let result = await removeShopCart(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("从购物车移除商品失败"));
    }
  },
  async changeCheckCart({ commit }, { skuId, isChecked }) {
    let result = await changeCheckCart(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("变更商品选中状态失败"));
    }
  },
};

const getters = {
  getCartInfoList(state) {
    let cartList = state.cartList[0];
    if (cartList) {
      return cartList.cartInfoList || [];
    } else {
      return [];
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
