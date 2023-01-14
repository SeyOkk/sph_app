import request from "./index";
import mock_request from "@/api/MockRequest";

export const getCategoryList = () => request.get("/product/getBaseCategoryList");

export const getBanners = () => mock_request.get("/getBanners")

export const getFloors = () => mock_request.get("/getFloors")
