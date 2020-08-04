#!/usr/bin/env ts-node-script

/*
 * @Author: last order
 * @Date: 2020-05-28 20:17:05
 * @LastEditTime: 2020-08-04 14:48:33
 */
import { checkDirectory } from '../utils'
import * as templatePackge from '../template/package.json'
import { version } from '../../package.json'
import { Command } from 'commander'
import { copy } from '@cli/cli/src/utils/index'
import fs = require('fs')
import path = require('path')
import ora = require('ora')
import chalk = require('chalk')

const program = new Command()

program.version(version, '-V, --version', '查看当前版本')
program
  .command('create <projectName>')
  .description('创建项目')
  .action(async source => {
    const projectName = source
    const dir = path.resolve(process.cwd(), projectName)
    const res = await checkDirectory(dir)
    if (res) return console.log('文件夹已存在')
    console.log()
    const spinner = ora({
      text: ' 正在努力生成项目中...',
      spinner: 'dots'
    })
    spinner.start()
    const templatePath = path.resolve(__dirname, '../../../template')
    const projectPath = path.resolve(process.cwd(), projectName)
    fs.mkdirSync(projectPath)
    const fileList = fs.readdirSync(templatePath)
    const Package = templatePackge
    Package.name = projectName
    fs.writeFileSync(`${projectPath}/package.json`, JSON.stringify(Package, null, 2))
    fileList.map(async file => {
      const exclude = ['dist', 'webpack', 'node_modules', 'yarn.lock', 'package.json', 'package-lock.json', 'project.config.ts']
      const result = exclude.find(item => item === file)

      if (!result) {
        const template = path.resolve(templatePath, file)
        await copy(template, projectPath)
      }
    })

    setTimeout(() => {
      spinner.text = ' 项目创建成功\n'
      spinner.succeed()
      console.log(`  - ${chalk.cyan(`cd ${projectName}`)}`)
      console.log(`  - ${chalk.cyan('npm install')}`)
      console.log(`  - ${chalk.cyan('npm run dev')}`)
    }, 4000)
  })

program
  .option('-h, --help', '查看帮助')

program.parse(process.argv)

export default program
