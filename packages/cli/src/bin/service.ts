#!/usr/bin/env ts-node-script

import { version } from '../../package.json'
import { program } from '../utils'
import dev from './command/dev'
import build from './command/build'

const defaultMode = () => {
  const args = process.argv
  if (args.includes('dev')) {
    return 'development'
  } else if (args.includes('build')) {
    return 'production'
  }
}

program
  .command('dev [args...]')
  .description('启动服务')
  .action(dev)

program
  .command('build [args...]')
  .description('开始打包')
  .action(build)

program
  .command('help')
  .description('查看帮助')

program
  .version(version, '-V, --version', '查看当前版本')
  .option('-h, --help', '查看帮助')
  .option('--mode [type]', '构建环境 development production test gray 共4种', defaultMode())
  .option('--report', '开启日志分析', false)

program.parse(process.argv)

export default program
