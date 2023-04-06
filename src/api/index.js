import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/TokenUtils";

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
    return result;
  },
  (error) => {
    nProgress.done();
    console.log("请求失败：", error);
  }
);

export default request;
