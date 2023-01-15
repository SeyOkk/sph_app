import { getSearchData } from "@/api/search";

const state = {
  searchData: {},
};

const mutations = {
  GET_SEARCH_DATA(state, payload) {
    state.searchData = payload
  }
};

const actions = {
  async getSearchData({ commit }, data = {}) {
    let result = await getSearchData(data);
    commit("GET_SEARCH_DATA", result)
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
