/*
 * @Author: last order
 * @Date: 2020-06-06 13:12:51
 * @LastEditTime: 2020-06-15 10:50:01
 */
import baseConfig from './webpack.base.config'
import webpack = require('webpack')
import merge = require('webpack-merge')
import OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import ProgressBarPlugin = require('progress-bar-webpack-plugin')
import SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

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

export default smp.wrap(
  merge(baseConfig, config)
)
