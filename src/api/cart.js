import request from "./index";

// 获取购物车列表
export const getCartList = (userToken) =>
  request.get(`/cart/cartList`, {
    headers: { userTempId: userToken },
  });
