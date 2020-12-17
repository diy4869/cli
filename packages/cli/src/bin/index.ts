#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-05-28 20:17:05
 * @LastEditTime: 2020-12-17 14:28:48
 */
import create from './command/create'
import { version } from '../../package.json'
import { Command } from 'commander'
import chalk = require('chalk')

const program = new Command()

program.version(version, '-V --version', '查看当前版本')

program
  .command('create <projectName>')
  .option('--vue', 'vue模板', false)
  .description('创建项目')
  .helpOption('-h, --help', '查看帮助')
  .action(create)

// 未知命令处理
program
  .arguments('<command>')
  .usage('cli <command> [options]')
  .action((cmd) => {
    console.log()
    program.outputHelp()
    console.log()
    console.log(` ${chalk.red(`未知命令：${cmd}`)}`)
  })

// 自定义帮助描述
program
  .helpOption('-h, --help', '查看帮助')

program
  .parse(process.argv)

export default program
