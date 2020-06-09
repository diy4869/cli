#!/usr/bin/env node

/*
 * @Author: last order
 * @Date: 2020-05-28 20:23:15
 * @LastEditTime: 2020-06-09 15:34:53
 */

const { Command } = require('commander')
const program = new Command()
const version = require('../../package.json').version
const fs = require('fs')
const path = require('path')
const utils = require('../utils/utils')
const fsPromise = fs.promises
const { checkDirectory } = utils

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

module.exports = program
