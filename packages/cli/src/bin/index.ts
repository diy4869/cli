#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-05-28 20:17:05
 * @LastEditTime: 2020-06-10 15:35:19
 */
import { checkDirectory } from '../utils/utils'
import { version } from '../../package.json'
import { Command } from 'commander'
import fs = require('fs')
import path = require('path')

const program = new Command()
const fsPromise = fs.promises
// const { checkDirectory } = utils

program.version(version, '-V, --version', '查看当前版本')
program
  .command('create <projectName>')
  .description('创建项目')
  .action(async source => {
    console.log(source)
    const projectName = source
    if (projectName) {
      const dir = path.resolve(process.cwd(), projectName)
      const res = await checkDirectory(dir)
      if (res) return console.log('文件夹已存在')
      await fsPromise.mkdir(dir)
    }
  })
  // .option('-h, --help', '查看帮助')

program.parse(process.argv)

export default program
