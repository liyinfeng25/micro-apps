/**
 * 基于 create-react-app 配置 webpack，使 index.js 导出的生命周期钩子能被 qiankun 识别获取
 */

module.exports = {
  webpack: (config, dev) => {
    config.output.library = `ReactCreatereactappDemo`;  // 微应用的包名，这里与主应用中注册的微应用名称一致
    config.output.libraryTarget = "umd";   // 将你的 library 暴露为所有的模块定义下都可运行的方式
    config.output.jsonpFunction = `webpackJsonp_ReactCreatereactappDemo`;  // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可

    return config;
  },

  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.disableHostCheck = true;  // 关闭主机检查，使微应用可以被 fetch
      config.headers = {
        "Access-Control-Allow-Origin": "*",  // 配置跨域请求头，解决开发环境的跨域问题
      };
      config.historyApiFallback = true;  // 配置 history 模式

      return config;
    };
  },
}