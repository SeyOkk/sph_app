import request from "./index";
import { getUuidByLocalStorage } from "@/utils/UuidUtils";

// 获取购物车列表
export const getCartList = () => {
  const userToken = getUuidByLocalStorage();
  return request.get(`/cart/cartList`, {
    headers: { userTempId: userToken },
  });
};

// 添加商品到购物车
export const addShopCart = (skuId, skuNum) => {
  const userToken = getUuidByLocalStorage();
  return request.post(`/cart/addToCart/${skuId}/${skuNum}`, null, {
    headers: { userTempId: userToken },
  });
};

// 删除购物车中的商品
export const removeShopCart = (skuId) => {
  const userToken = getUuidByLocalStorage();
  return request.delete(`/cart/deleteCart/${skuId}`, {
    headers: { userTempId: userToken },
  });
};

// 变更购物车选中状态
export const changeCheckCart = (skuId, isChecked) => {
  const userToken = getUuidByLocalStorage();
  return request.get(`/cart/checkCart/${skuId}/${isChecked}`, {
    headers: { userTempId: userToken },
  });
};
