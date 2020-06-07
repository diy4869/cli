#!/usr/bin/env node

/*
 * @Author: last order
 * @Date: 2020-05-28 20:23:15
 * @LastEditTime: 2020-06-07 11:29:00
 */

 
const { Command } = require('commander')
const program = new Command()
const version = require('../package.json').version
const fs = require('fs')
const path = require('path')
const { checkDir } = require('../src/utils/utils')

const fsPromise = fs.promises
program.version(version, '-V, --version', '查看当前版本')
program
  .command('create <projectName>')
  .description('创建项目')
  .action(async source => {
    const projectName = source.args[0]
    if (projectName) {
      const dir = path.join(__dirname, projectName)
      const res = await checkDir(projectName)
      if (!res) await fsPromise.mkdir(dir)
      console.log('文件夹已存在')
    }
  })
  // .option('-h, --help', '查看帮助')

program.parse(process.argv)

module.exports = program
