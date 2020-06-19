/*
 * @Author: last order
 * @Date: 2020-06-06 13:12:51
 * @LastEditTime: 2020-06-19 16:42:26
 */
import baseConfig from './webpack.base.config'
import webpack = require('webpack')
import merge = require('webpack-merge')
import OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import ProgressBarPlugin = require('progress-bar-webpack-plugin')
import SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

export default (): webpack.Configuration => {
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
  console.log(__dirname)
  return smp.wrap(
    merge(
      baseConfig(),
      config
    )
  )
}
