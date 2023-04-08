import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, removeItem } from "@/utils/TokenUtils";
import vm from "@/main";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 进度条开始
  nProgress.start();
  const token = getToken();
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (success) => {
    // 进度条结束
    nProgress.done();
    const result = success.data;
    if (result.code === 208) {
      // 用户未登录，可能是token过期了，将本地存储的token和用户信息删除，并跳转到登录页
      removeItem("TOKEN");
      removeItem("USER");
      vm.$router.push("/login");
    }
    return result;
  },
  (error) => {
    nProgress.done();
    console.log("请求失败：", error);
  }
);

export default request;
