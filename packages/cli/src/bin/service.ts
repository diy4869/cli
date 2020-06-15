#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-06-10 14:22:58
 * @LastEditTime: 2020-06-15 14:53:38
 */
import { buildMode, report, server, getPort } from '../utils/webpackUtils'
import { HOST } from '../config/index'
import { Command } from 'commander'
import getProjectConfig from '@cli/template/webpack/utils/getProjectConfig'
import webpackBaseConfig from '@cli/template/webpack/webpack.base.config'
import webpackProdConfig from '@cli/template/webpack/webpack.prod.config'
import { version } from '../../package.json'
import webpack = require('webpack')
import merge = require('webpack-merge')
import chalk = require('chalk')
import address = require('address')

const userWebpackConfig = () => getProjectConfig()

const program = new Command()

const log = (PORT: number): void => {
  console.clear()
  // eslint-disable-next-line no-irregular-whitespace
  console.log(`${chalk.bgGreen(`${chalk.black(' DONE ')}`)}　服务启动完成\n\n`)
  console.log('  项目启动成功，地址是:\n')
  console.log(`  - Local:   ${chalk.cyan(`http://localhost:${PORT}`)}`)
  console.log(`  - Network: ${chalk.cyan(`http://${address.ip()}:${PORT}`)}`)
  if (program.report) console.log(`  - Report:  ${chalk.cyan('http://127.0.0.1:8888')}`)
}

program
  .command('dev [args...]')
  .description('启动服务')
  .action(async () => {
    const config = merge(webpackBaseConfig, {
      mode: buildMode(program.mode),
      plugins: [
        new webpack.HotModuleReplacementPlugin({
          multiStep: true,
          fullBuildTimeout: 200
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(program.mode)
        })
      ]
    })
    if (program.report) report(config, program.report)
    console.log(config)
    const userWebpack = merge(
      config,
      userWebpackConfig()?.configWebpack.call(null, config, process.env.NODE_ENV)
    )
    const compiler = webpack(userWebpack)
    const devServer = server(compiler)
    const PORT = await getPort()
    console.log(compiler.options)
    ;(await devServer).listen(PORT, HOST, err => {
      if (err) return console.log(err)
      log(PORT)
    })
  })

program
  .command('build [args...]')
  .description('开始打包')
  .action(async () => {
    const config = merge(webpackProdConfig, {
      mode: buildMode(program.mode),
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(program.mode)
        })
      ]
    })
    if (program.report) report(config, program.report)
    const userWebpack = merge(
      config,
      userWebpackConfig()?.configWebpack.call(null, config, process.env.NODE_ENV)
    )
    const compiler = webpack(userWebpack)

    compiler.run((err, stats) => {
      console.clear()
      if (err || stats.hasErrors()) {
        // eslint-disable-next-line no-irregular-whitespace
        console.log(`${chalk.bgRed(`${chalk.black(' ERROR ')}`)}　编译出错\n`)
        console.log(err)
        console.log(stats.compilation.errors[0])
      } else {
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
  })

program
  .command('help')
  .description('查看帮助')

program
  .version(version, '-V, --version', '查看当前版本')
  .option('-h, --help', '查看帮助')
  .option('--mode [type]', '构建环境 development production test preProduction 共4种', 'development')
  .option('--report', '开启日志分析', false)

program.parse(process.argv)

export default program
