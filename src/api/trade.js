import request from "@/api/index";

// 获取订单交易信息
export const getOrderTrade = () => request.get("/order/auth/trade");

// 提交订单
export const submitOrder = (tradeNo, data) =>
  request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);

// 获取订单支付信息
export const getOrderPayInfo = (orderNo) =>
  request.get(`/payment/weixin/createNative/${orderNo}`);

// 获取订单支付状态
export const getOrderPayStatus = (orderNo) =>
  request.get(`/payment/weixin/queryPayStatus/${orderNo}`);
