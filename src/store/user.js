import { sendSmsCode, register } from "@/api/user";

const state = {};

const mutations = {};

const actions = {
  async sendSmsCode({ commit }, { phone }) {
    let result = await sendSmsCode(phone);
    if (result.code === 200) {
      return result.data;
    } else {
      alert(result.message);
    }
  },
  async register({ commit }, { phone, password, code }) {
    let result = await register(phone, password, code);
    if (result.code !== 200) {
      alert(result.message);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
