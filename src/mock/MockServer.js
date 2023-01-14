import Mock from "mockjs"
import banners from "./banners.json"
import floors from "./floors.json"

// 配置mock拦截的请求url和method
Mock.mock("/mock/getBanners", "get", banners)
Mock.mock("/mock/getFloors", "get", floors)