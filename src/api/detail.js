import request from "./index";

// 商品详情信息
export const getGoodsDetail = (skuId) => request.get(`/item/${skuId}`);
