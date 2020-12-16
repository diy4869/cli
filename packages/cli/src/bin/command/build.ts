/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-16 13:55:41
 */
import webpackProdConfig from 'cli-plugin-default/src/webpack/webpack.prod.config'
import { buildMode, report, program, userWebpackConfig } from '../../utils'
import { merge } from 'webpack-merge'
import webpack = require('webpack')
import chalk = require('chalk')
import ora = require('ora')

export default async function (): Promise<void> {
  const spinner = ora({
    text: `Build ${process.env.NODE_ENV}`
  }).start()
  const config = merge(webpackProdConfig(), {
    mode: buildMode(program.mode)
  })

  if (program.report) report(config, program.report)
  userWebpackConfig?.configWebpack?.call(null, config, process.env.NODE_ENV)
  const userWebpack = userWebpackConfig ? merge(config) : config

  const compiler = webpack(userWebpack)
  compiler.run((err, stats) => {
    spinner.stop()
    if (err || stats.hasErrors()) {
      // eslint-disable-next-line no-irregular-whitespace
      console.log(`${chalk.bgRed(`${chalk.black(' ERROR ')}`)}　编译出错\n`)
      console.log(err)
      console.log(stats.compilation.errors[0])
    } else {
      console.clear()
      // eslint-disable-next-line no-irregular-whitespace
      console.log(`${chalk.bgGreen(`${chalk.black(' DONE ')}`)}　编译完成\n`)
      const log = stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })
      process.stdout.write(log + '\n\n')
    }
  })
}
