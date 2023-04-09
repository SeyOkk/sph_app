import request from "./index";
import { getUuidByLocalStorage } from "@/utils/UuidUtils";

//获取短信验证码
export const sendSmsCode = (phone) =>
  request.get(`user/passport/sendCode/${phone}`);

//用户注册
export const register = (phone, password, code) =>
  request.post("/user/passport/register", { phone, password, code });

//用户登录
export const login = (data) => request.post("/user/passport/login", data);

//获取用户信息
export const getUserInfo = () => request.get("/user/passport/auth/getUserInfo");

//退出登录
export const logout = () => request.get("/user/passport/logout");

//获取我的订单列表
export const getMyOrder = (page, limit) =>
  request.get(`/order/auth/${page}/${limit}`);
