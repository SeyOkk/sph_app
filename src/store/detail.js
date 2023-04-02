import { getGoodsDetail, addShopCart } from "@/api/detail";
import { getUuidByLocalStorage } from "@/utils/UuidUtils";

const state = {
  goodsDetail: {},
};

const mutations = {
  GET_GOODS_DETAIL(state, payload) {
    state.goodsDetail = payload;
  },
};

const actions = {
  async getGoodsDetail({ commit }, skuId) {
    let result = await getGoodsDetail(skuId);
    commit("GET_GOODS_DETAIL", result.data);
  },
  async saveShopCart({ commit }, { skuId, skuNum }) {
    const userToken = getUuidByLocalStorage();
    let res = await addShopCart(skuId, skuNum, userToken);
    if (res.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
};

const getters = {
  categoryView(state) {
    return state.goodsDetail.categoryView || {};
  },
  goodsInfo(state) {
    return state.goodsDetail.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodsDetail.spuSaleAttrList || [];
  },
  skuSaleAttrValueList(state) {
    return state.goodsDetail.skuInfo.skuSaleAttrValueList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
