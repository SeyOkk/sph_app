import { getCategoryList } from "@/api/home";

const state = {
  categoryList: [],
};

const mutations = {
  GET_CATEGORY_LIST(state, payload) {
    state.categoryList = payload;
  },
};

const actions = {
  async getCategoryList({ commit }) {
    let result = await getCategoryList();
    commit("GET_CATEGORY_LIST", result);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
