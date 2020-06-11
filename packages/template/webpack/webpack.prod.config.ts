/*
 * @Author: last order
 * @Date: 2020-06-06 13:12:51
 * @LastEditTime: 2020-06-11 13:50:20
 */
import baseConfig from './webpack.base.config'
import webpack = require('webpack')
import merge = require('webpack-merge')
import OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import ProgressBarPlugin = require('progress-bar-webpack-plugin')

const config: webpack.Configuration = {
  optimization: {
    minimize: true
  },
  plugins: [
    new OptimizationCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new ProgressBarPlugin()
  ]
}

export default merge(baseConfig, config)
