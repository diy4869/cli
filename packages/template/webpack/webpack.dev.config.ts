/*
 * @Author: last order
 * @Date: 2020-06-06 13:11:49
 * @LastEditTime: 2020-06-08 19:10:35
 */
import baseConfig from './webpack.base.config'
import chalk from 'chalk'
import webpack = require('webpack')
import merge = require('webpack-merge')
import address = require('address')
import portFinder = require('portfinder')
import path = require('path')
import FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// import chalk = require('chalk')

const getPort = async () => {
  const result = await portFinder.getPortPromise({
    port: 8080,
    stopPort: 9000
  })

  return result
}
let devServerPort = 8080
const devConfig = async (): Promise<webpack.Configuration> => {
  const port = await getPort() as unknown as number
  devServerPort = port
  const config: webpack.Configuration = {
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      host: '0.0.0.0',
      port: port,
      hot: true,
      compress: true,
      noInfo: true,
      quiet: true,
      overlay: {
        warnings: true,
        errors: false
      },
      useLocalIp: true,
      clientLogLevel: 'none'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }

  return merge(baseConfig, config)
}
const compiler = webpack(devConfig() as webpack.Configuration)

compiler.run(err => {
  if (err) console.log(err)
})

compiler.hooks.done.tap('cli done', () => {
  console.clear()
  console.log()
  console.log('  项目启动成功，地址是:')
  console.log()
  console.log(`  - Local:   ${chalk.cyan(`http://localhost:${devServerPort}`)}`)
  console.log(`  - Network: ${chalk.cyan(`http://${address.ip()}/${devServerPort}`)}`)
})
export default devConfig
