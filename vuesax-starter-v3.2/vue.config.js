/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - Clean Vue.js Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


module.exports = {
  publicPath: '/',
  devServer: {
    port: 8070,
    proxy: {
      '/baidu': {                              //需要代理的接口
        target: 'http://api.map.baidu.com/',    //目标服务器
        changeOrigin: true,                //是否跨域
        pathRewrite: {
          '^/baidu': ''
        },   //重写
      },
      '/api': {                              //需要代理的接口
        target: 'https://view.inews.qq.com/',    //目标服务器
        changeOrigin: true,                //是否跨域
        pathRewrite: {
          '^/api': ''
        },   //重写
      },

    }
  }
}
