const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  // 开启source-map
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
 
})
