#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-05-28 20:17:05
 * @LastEditTime: 2020-06-18 15:20:00
 */
import { checkDirectory } from '../utils'
import { version } from '../../package.json'
import { Command } from 'commander'
import { copy } from '@cli/cli/src/utils/index'
import fs = require('fs')
import path = require('path')

const program = new Command()

program.version(version, '-V, --version', '查看当前版本')
program
  .command('create <projectName>')
  .description('创建项目')
  .action(async source => {
    console.log(source)
    const projectName = source
    const dir = path.resolve(process.cwd(), projectName)
    const res = await checkDirectory(dir)
    if (res) return console.log('文件夹已存在')
    const templatePath = path.resolve(__dirname, '../../../template')
    const projectPath = path.resolve(process.cwd(), projectName)
    fs.mkdirSync(projectPath)
    const fileList = fs.readdirSync(templatePath)
    fileList.map(async file => {
      const exclude = ['webpack', 'node_modules', 'yarn.lock', 'package-lock.json', 'project.config.ts']
      const result = exclude.find(item => item === file)
      if (!result) {
        console.log(path.join(templatePath, file) + '============' + projectPath)
        await copy(path.join(templatePath, file), projectPath)
      }
      // console.log(file)
    })
  })
  // .option('-h, --help', '查看帮助')

program.parse(process.argv)

export default program
