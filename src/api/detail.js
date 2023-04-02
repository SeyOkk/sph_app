import request from "./index";

// 商品详情信息
export const getGoodsDetail = (skuId) => request.get(`/item/${skuId}`);

// 添加商品到购物车
export const addShopCart = (skuId, skuNum, userToken) =>
  request.post(`/cart/addToCart/${skuId}/${skuNum}`, null, {
    headers: { userTempId: userToken },
  });