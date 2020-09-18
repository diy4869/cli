#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-05-28 20:17:05
 * @LastEditTime: 2020-08-04 14:48:33
 */
import create from './command/create'
import { version } from '../../package.json'
import { Command } from 'commander'

const program = new Command()

program.version(version, '-V --version', '查看当前版本')
program
  .command('create <projectName> [options...]')
  .option('-h, --help', '查看帮助')
  .option('--vue', 'vue模板', false)
  .description('创建项目')
  .action(create)

program
  .option('-h, --help', '查看帮助')

program.parse(process.argv)

program.on('--help', (test) => {
  console.log(test)
  console.log('Example call:')
  console.log('  $ custom-help --help')
})
export default program
