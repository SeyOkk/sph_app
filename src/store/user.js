import { sendSmsCode, register, getUserInfo, login, logout } from "@/api/user";
import {
  getToken,
  removeItem,
  setToken,
  setUserInfo,
  getUser,
} from "@/utils/TokenUtils";

const state = {
  token: getToken(),
  userInfo: getUser(),
};

const mutations = {
  TOKEN(state, payload) {
    state.token = payload;
  },
  LOGOUT(state) {
    state.token = "";
    state.userInfo = {};
  },
  SAVE_USER(state, payload) {
    state.userInfo = payload;
  },
};

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
  async login({ commit }, data) {
    const result = await login(data);
    if (result.code === 200) {
      commit("TOKEN", result.data.token);
      // 持久化到本地存储
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  async getUserInfo({ commit }) {
    const result = await getUserInfo();
    console.log(result);
    if (result.code === 200) {
      commit("SAVE_USER", result.data);
      // 持久化到本地存储
      setUserInfo(result.data);
      return "ok";
    } else {
      return Promise.reject(result.message);
    }
  },
  async logout({ commit }) {
    const result = await logout();
    if (result.code === 200) {
      commit("LOGOUT");
      // 清空本地存储的token
      removeItem("TOKEN");
      removeItem("USER");
      return "ok";
    } else {
      return Promise.reject(result.message);
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
