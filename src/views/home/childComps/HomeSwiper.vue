<template>
      <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
            <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
//在导入的文件夹中使用index.js导出可以在导入时一次导入多个组件，而不用指定到具体文件
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:"HomeSwiper",
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style>

</style>