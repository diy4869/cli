/*
 * @Author: last order
 * @Date: 2020-06-11 14:24:07
 * @LastEditTime: 2020-06-11 16:12:12
 */
import webpack = require('webpack')
import BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

export const buildMode = (mode: string): string => {
  const str = ['test', 'development', 'production', 'preProduction'].find(item => mode === item)

  return str === 'test' || str === 'development' ? 'development' : 'production'
}

export const report = (config: webpack.Configuration, type: boolean): webpack.Configuration => {
  if (type) {
    if (!config.plugins.includes(BundleAnalyzerPlugin)) {
      config.plugins.push(
        new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
      )
    }
  }

  return config
}
