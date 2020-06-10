#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-06-10 14:22:58
 * @LastEditTime: 2020-06-10 15:35:08
 */
import { Command } from 'commander'
import { version } from '../../package.json'

const program = new Command()

program
  .command('dev')
  .description('启动服务')
  .action(async source => {
    console.log(source)
  })

program
  .command('build')
  .description('开始打包')
  .action(async source => {
    console.log(source)
  })

program
  .command('help')
  .description('查看帮助')

program
  .version(version, '-V, --version', '查看当前版本')
  .option('-h, --help', '查看帮助')
  .option('--mode', 'devlopment production 2种')
  .option('--report', '开启日志分析')

program.parse(process.argv)

export default program
