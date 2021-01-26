/*
 * @Author: last order
 * @Date: 2020-06-11 14:24:07
 * @LastEditTime: 2020-07-30 14:11:28
 */
import userProjectConfig from 'cli-plugin-default/src/webpack/utils/getProjectConfig'
import { HOST, PORT } from '../config/index'
import { merge } from 'lodash'
import { WEBPACK_ENV } from '../../../../types/index'
import webpack = require('webpack')
import WebpackDevServer = require('webpack-dev-server')
import portFinder = require('portfinder')
import BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

export const buildMode = (mode: string): WEBPACK_ENV => {
  const str = ['test', 'development', 'production', 'gray'].find(item => mode === item)

  return str === 'test' || str === 'development' ? 'development' : 'production'
}

export const report = (config: webpack.Configuration, type: boolean): webpack.Configuration => {
  if (type) {
    if (!config.plugins.includes(BundleAnalyzerPlugin)) {
      config.plugins.push(
        new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
          openAnalyzer: false
        })
      )
    }
  }

  return config
}
export const getPort = async (port = PORT): Promise<number> => {
  const result = await portFinder.getPortPromise({
    port: port,
    stopPort: PORT + 1000
  })

  return result
}

export const server = async (compiler: webpack.Compiler, PORT = 8080, userDevServer?: WebpackDevServer.Configuration): Promise<WebpackDevServer> => {
  console.log(userDevServer)
  const devServer = new WebpackDevServer(compiler, merge(
    {
      host: HOST,
      port: PORT,
      publicPath: userProjectConfig().publicPath,
      contentBase: 'src',
      hot: true,
      hotOnly: true,
      compress: true,
      noInfo: true,
      quiet: true,
      watchContentBase: true,
      overlay: {
        warnings: false,
        errors: true
      },
      open: false,
      useLocalIp: false,
      clientLogLevel: 'none'
    }, userDevServer)
  )

  // console.log(devServer)
  return devServer as WebpackDevServer
}
