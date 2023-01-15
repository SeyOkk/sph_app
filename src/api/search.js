import request from "@/api/index";

// 获取商品列表
export const getSearchData = data => request.post("/list", data)
