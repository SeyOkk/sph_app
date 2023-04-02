import { getGoodsDetail } from "@/api/detail";

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
