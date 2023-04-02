import { getCartList } from "@/api/cart";
import { getUuidByLocalStorage } from "@/utils/UuidUtils";

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
    const userToken = getUuidByLocalStorage();
    let result = await getCartList(userToken);
    commit("GET_CART_LIST", result.data);
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
