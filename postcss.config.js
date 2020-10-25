module.exports = {
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport":{
            viewportWidth:375,      //视图的宽度
            viewportHeight:667,     //视图的高度
            unitPrecision:5,        //保留5位小数
            viewportUnit:"vw",      //需要转换的单位
            selectorBlackList:["ignore","tab-bar","tab-bar-item"],//不转换的类
            minPixeValue:1,         //小于1px不转换位视图单位
            mediaQuery:false,        //是否使用媒体查询
            exclude:[/TabBar/]       //必须时正则表示式匹配的文件
        },
    }
}