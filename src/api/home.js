import request from "./index";

export const getCategoryList = () => request.get("/product/getBaseCategoryList");
