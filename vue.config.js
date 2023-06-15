const {
  defineConfig
} = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: false, // 编译完成是否打开网页
    host: 'localhost', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    proxy: {
      "/devApi": {
        target: "https://console-mock.apipost.cn/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/", //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          "^/devApi": ''
        },
      }
    }
  }
}