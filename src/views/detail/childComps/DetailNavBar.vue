<template>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div v-for="(item,index) in titles" 
                :key="index" class="title-item" :class="{active: index === currentIndex}" 
                @click="titleClick(index)">
                {{item}}
              </div>
          </div>
      </nav-bar>
</template>


<script>
import NavBar from "components/common/navbar/Navbar"
export default {
    name:"DetailNavBar",
    data() {
        return {
            titles:["商品","参数","评论","图片"],
            currentIndex:0
        }
    },
    components:{
         NavBar
    },
    methods: {
        titleClick(index){
            this.currentIndex = index;
            this.$emit("titleClick",index);
        },
        backClick(){
            this.$router.back();
        }
    },

}
</script>

<style scope>
    .title{
        display: flex;
    }
    .title-item{
        flex: 1;
        font-size: 14px;
    }
    .active{
        color: var(--color-high-text);
    }
    .back img{
        margin-top: 12px;
    }
</style>