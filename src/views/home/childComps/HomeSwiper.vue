<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//在导入的文件夹中使用index.js导出可以在导入时一次导入多个组件，而不用指定到具体文件
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoad() {
      //不用防抖函数是因为只需加载一次就行了
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
</style>