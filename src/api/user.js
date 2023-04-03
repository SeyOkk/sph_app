import request from "./index";

//获取短信验证码
export const sendSmsCode = (phone) =>
  request.get(`user/passport/sendCode/${phone}`);

//用户注册
export const register = (phone, password, code) =>
  request.post("/user/passport/register", { phone, password, code });
