const path = require("path");

module.exports = {
  devServer: {
    port: 3002, // 监听端口
    disableHostCheck: true,  // 关闭主机检查，使微应用可以被 fetch
    headers: {
      "Access-Control-Allow-Origin": "*",   // 配置跨域请求头，解决开发环境的跨域问题
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    output: {
      library: "VueCliDemo",  // 微应用的包名，这里与主应用中注册的微应用名称一致
      libraryTarget: "umd",  // 将你的 library 暴露为所有的模块定义下都可运行的方式
      jsonpFunction: `webpackJsonp_VueCliDemo`,  // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
    },
  },
};