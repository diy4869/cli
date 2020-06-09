/*
 * @Author: last order
 * @Date: 2020-06-06 13:12:51
 * @LastEditTime: 2020-06-09 13:54:29
 */
import baseConfig from './webpack.base.config'
import webpack = require('webpack')
import merge = require('webpack-merge')
import OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config: webpack.Configuration = {
  optimization: {
    minimize: true
  },
  plugins: [
    new OptimizationCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ]
}

export default merge(baseConfig, config)
