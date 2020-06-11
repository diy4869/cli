#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-06-10 14:22:58
 * @LastEditTime: 2020-06-11 16:16:38
 */
import { buildMode, report } from '../utils/webpackUtils'
import { Command } from 'commander'
// import webpackDevConfig from '@cli/template/webpack/webpack.dev.config'
import webpackProdConfig from '@cli/template/webpack/webpack.prod.config'
import { version } from '../../package.json'
import webpack = require('webpack')
import merge = require('webpack-merge')
import chalk = require('chalk')

const program = new Command()

program
  .command('dev [args...]')
  .description('启动服务')
  .action(async () => {
    const config = merge(webpackProdConfig, {
      mode: 'production'
    })
    const compiler = webpack(config)

    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(err)
        console.log(stats.hasErrors())
        console.log('构建出错')
      } else {
        console.log('开始构建')
      }
    })
  })

program
  .command('build [args...]')
  .description('开始打包')
  .action(async () => {
    const config = merge(webpackProdConfig, {
      mode: buildMode(program.mode)
    })
    console.log(program.report)
    if (program.report) report(config, program.report)
    const compiler = webpack(config)

    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        // eslint-disable-next-line no-irregular-whitespace
        console.log(`${chalk.bgRed(`${chalk.black(' ERROR ')}`)}　编译出错\n`)
        console.log(err)
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
  })

program
  .command('help')
  .description('查看帮助')

program
  .version(version, '-V, --version', '查看当前版本')
  .option('-h, --help', '查看帮助')
  .option('--mode [type]', '构建环境', 'production')
  .option('--report', '开启日志分析', false)

program.parse(process.argv)

export default program
