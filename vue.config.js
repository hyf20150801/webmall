module.exports = {
    configureWebpack:{
        resolve:{
          extensions:[],
          alias:{
              //别名默认@就是src
              "assets":"@/assets",
              "common":"@/common",
              "components":"@/components",
              "network":"@/network",
              "views":"@/views",
          }
        }
    }
}