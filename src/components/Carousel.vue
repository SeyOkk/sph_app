<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div v-for="banner in banners" :key="banner.id" class="swiper-slide">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: {
    banners: {
      type: Array,
    },
  },
  watch: {
    banners: {
      // immediate 立即执行一次监听 handler函数
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
            // direction: 'vertical', // 垂直播放图片，默认水平播放
            loop: true,
            // 分页效果
            pagination: {
              el: ".swiper-pagination",
            },
            // 上一页、下一页
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped></style>
