import { getCategoryList, getBanners, getFloors } from "@/api/home";

const state = {
  categoryList: [],
  banners: [],
  floors: []
};

const mutations = {
  GET_CATEGORY_LIST(state, payload) {
    state.categoryList = payload;
  },
  GET_BANNERS(state, payload) {
    state.banners = payload
  },
  GET_FLOORS(state, payload) {
    state.floors = payload
  }
};

const actions = {
  async getCategoryList({ commit }) {
    let result = await getCategoryList();
    commit("GET_CATEGORY_LIST", result);
  },
  async getBanners({commit}) {
    let result = await getBanners()
    commit("GET_BANNERS", result)
  },
  async getFloors({commit}) {
    let result = await getFloors()
    commit("GET_FLOORS", result)
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
