<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img :class="currentIndex === index ? 'active' : ''" :src="img.imgUrl" @click="changeImg(index)" />
      </div>
    </div>
    <div class="swiper-button-next" @click="nextImgIndex"></div>
    <div class="swiper-button-prev" @click="preImgIndex"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeImg(index) {
      this.currentIndex = index;
      this.$emit("changeImgIndex", index);
    },
    preImgIndex() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.imgList.length - 1;
      }
      this.changeImg(this.currentIndex);
    },
    nextImgIndex() {
      this.currentIndex++;
      if (this.currentIndex > this.imgList.length - 1) {
        this.currentIndex = 0;
      }
      this.changeImg(this.currentIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
