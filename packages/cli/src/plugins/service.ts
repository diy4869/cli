import baseConfig from 'cli-plugin-default/src/webpack/webpack.base.config'
import merge from 'webpack-merge'
import webpack = require('webpack')

export default class Service {
  webpackConfig: webpack.Configuration[]
  constructor () {
    this.webpackConfig = [
      baseConfig()
    ]
  }

  configWebpack (fn: (config?: webpack.Configuration) => webpack.Configuration): void {
    this.webpackConfig.push(
      fn()
    )
    // console.log(this.webpackConfig)
    const result: webpack.Configuration = this.webpackConfig.reduce((total, current) => {
      return merge(total, current)
    }, {})

    console.log(result)
  }

  dotEnv (): void {
    console.log('dotEnv')
  }

  dev (): void {
    console.log('dev')
  }

  build (): void {
    console.log('build')
  }
}
