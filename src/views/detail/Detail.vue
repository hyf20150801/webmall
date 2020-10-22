<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
</div>
  <!-- <div>{{iid}}</div> -->
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo  from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";


import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList';

import {getDatail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import {itemListenerMixin,backTopMixin} from "common/mixin";
import {debounce} from "common/utils";

export default {
    name:"Detail",
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
        }
        
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
    },
    created(){
        //1、保持传入的iid
        this.iid = this.$route.params.iid;
        //2、更具iid请求数据
        getDatail(this.iid).then(res =>{
            //console.log(res);
            //1、获取顶部轮播图图片
            var data = res.result;
            this.topImages = data.itemInfo.topImages;
            //2、获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
            //3、创建店铺信息
            this.shop = new Shop(data.shopInfo);
            //4、保存商品的详情数据
            this.detailInfo = data.detailInfo;
            //5、获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            //6.取出评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
            //dom渲染后执行的函数,这里数据不对是因为图片还没加载完高度有问题
            // this.$nextTick(()=>{
            //     this.themeTopYs = [];
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            //     console.log(this.themeTopYs)
            // });
        })
        //3、请求推荐数据
        getRecommend().then(res =>{
            this.recommends = res.data.list;
        });

        //4、给getThemeTopY赋值并进行防抖
        this.getThemeTopY = debounce(()=>{
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE);
        },200)
    },
    methods: {
        imageLoad(){
            this.newRefresh();
            this.getThemeTopY();
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
        },
        contentScroll(position){
            //1、获取y值
           const positionY = -position.y;
           //2、positionY和主题中的值进行对比
           //positionY在0-7856之间index为0
           //positionY在7856-9236之间index为1
           let length = this.themeTopYs.length; 
            //    for(let i = 0; i <length;i++){
            //     if(this.currentIndex !=i &&(i<length-1 && positionY >= this.themeTopYs[i] &&positionY<this.themeTopYs[i+1])
            //     ||(i === length - 1 &&positionY >= this.themeTopYs[i])){
            //         this.currentIndex = i;
            //         this.$refs.nav.currentIndex = this.currentIndex;
            //     }
            //    }
            //hack写法:在数组最后加最大值
            for(let i = 0; i <length-1;i++){
                if(this.currentIndex !=i &&(i<length-1 && positionY >= this.themeTopYs[i] &&positionY<this.themeTopYs[i+1])){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }

            //3、是否显示回到顶部
           this.listenshowBackTop(position)
        },
        addToCart(){
            // 1、获取购物车需要展示的信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;

            //2、将商品添加到购物车里
            //this.$store.carList.push(product);
            //this.$store.commit("addCart",product);
            this.$store.dispatch("addCart",product)
        }
    },
    mounted() {
    },
    destroyed() {
        this.$bus.$off("itemImageLoad",this.itemImgListener);
    },

}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 44px - 49px);
    }

</style>