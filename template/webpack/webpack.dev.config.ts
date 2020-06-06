/*
 * @Author: last order
 * @Date: 2020-06-06 13:11:49
 * @LastEditTime: 2020-06-06 13:40:20
 */
import baseConfig from './webpack.base.config'
import webpack = require('webpack')
import merge = require('webpack-merge')
import path = require('path')

const devConfig: webpack.Configuration = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: 'localhost',
    port: 8000,
    hot: true,
    compress: true,
    noInfo: true,
    quiet: true,
    overlay: {
      warnings: true,
      errors: false
    },
    clientLogLevel: 'none'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

export default merge(baseConfig, devConfig)
