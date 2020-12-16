/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-15 10:31:25
 */

import { buildMode, report, server, getPort, program } from '../../utils'
import webpackBaseConfig from '@lo_cli/template/webpack/webpack.base.config'
import { HOST } from '../../config'
import { merge } from 'webpack-merge'
import webpack = require('webpack')
import chalk = require('chalk')
import address = require('address')
import FriendlyErrrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const log = (PORT: number): void => {
  console.clear()
  // eslint-disable-next-line no-irregular-whitespace
  console.log(`${chalk.bgGreen(`${chalk.black(' DONE ')}`)}　服务启动完成\n\n`)
  console.log('  项目启动成功，地址是:\n')
  console.log(`  - Local:   ${chalk.cyan(`http://localhost:${PORT}`)}`)
  console.log(`  - Network: ${chalk.cyan(`http://${address.ip()}:${PORT}`)}`)
  if (program.report) console.log(`  - Report:  ${chalk.cyan('http://127.0.0.1:8888')}`)
}

export default async function (): Promise<void> {
  const config = merge(webpackBaseConfig(program.mode), {
    mode: buildMode(program.mode),
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
        fullBuildTimeout: 200
      }),
      new FriendlyErrrorsWebpackPlugin({
        compilationSuccessInfo: undefined,
        onErrors (severity, errors) {
          console.log(severity)
          console.log(errors)
          if (severity !== 'error' || severity !== 'warning') {
            return undefined
          } else {
            log(PORT)
          }
        }
      })
    ]
  })
  if (program.report) report(config, program.report)
  const userWebpack = merge(
    config
    // userWebpackConfig?.configWebpack?.call(userWebpackConfig.configWebpack, config, process.env.NODE_ENV)
  )
  const compiler = webpack(userWebpack)
  const devServer = server(compiler)
  const PORT = await getPort()
  // compiler.hooks.done.tap('cli-service dev', () => {
  //   // console.log('产生了新的编译')
  //   log(PORT)
  // })
  await (await devServer).listen(PORT, HOST, err => {
    if (err) return console.log(err)
    log(PORT)
  })
}
