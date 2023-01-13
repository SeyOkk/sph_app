import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 进度条开始
  nProgress.start();
  // 配置对象，配置请求头等等
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (success) => {
    // 进度条结束
    nProgress.done();
    const result = success.data;
    if (result.code === 200) {
      return result.data;
    } else {
      console.log("请求失败：", result.message);
    }
  },
  (error) => {
    nProgress.done();
    console.log("请求失败：", error);
  }
);

export default request;
