/*
 * @Author: curechen 981470148@qq.com
 * @Date: 2023-01-15 14:29:38
 * @LastEditors: curechen 981470148@qq.com
 * @LastEditTime: 2023-01-15 14:29:48
 * @FilePath: \GraduationProject\local-life-mall\vue.config.js
 * @Description: 
 */
module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }]
    },
  }
}