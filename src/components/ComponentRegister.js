import Vue from "vue";

import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagenation from "@/components/Pagenation";

// 将TypeNav三级分类组件注册为全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagenation", Pagenation);
