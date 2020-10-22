import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";
import {BACK_POSITION} from "common/const";
export const itemListenerMixin = {
    data(){
        return {
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh,500);
           this.itemImgListener =() =>{
           this.newRefresh();
         }
        this.$bus.$on("itemImageLoad",this.itemImgListener);
    },
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, BACK_POSITION);
          },
        listenshowBackTop(position){
            this.isShowBackTop = -position.y > BACK_POSITION;
        }
    },
}