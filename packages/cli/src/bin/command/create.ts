/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-23 11:25:56
 */
import Plugins from '../../plugins/index'
import VueTemplate from 'cli-plugin-vue'
import reactTemplate from 'cli-plugin-react'
import Generator, { Files } from '../../plugins/generator'
import { checkDirectory, Delete } from '../../utils'
import { API } from '@/types'
import ora = require('ora')
import path = require('path')
import commander = require('commander')
import chalk = require('chalk')
import inquirer = require('inquirer')

export function baseCreate (dir: string, template: Files, projectName: string): void {
  const spinner = ora({
    text: ' 正在努力生成项目中...\n',
    spinner: 'dots'
  }).start()

  new Generator().run(dir, template as unknown as Files)
  const timeout = setTimeout(() => {
    spinner.stop()
    // console.clear()
    // eslint-disable-next-line no-irregular-whitespace
    console.log(`${chalk.bgGreen(`${chalk.black(' 项目创建成功 ')}`)}\n`)
    console.log(`  - ${chalk.cyan(`cd ${projectName}`)}`)
    console.log(`  - ${chalk.cyan('npm install')}`)
    console.log(`  - ${chalk.cyan('npm run dev')}`)
  }, 1000)

  process.on('beforeExit', () => {
    clearTimeout(timeout)
  })
}

export default async (projectName: string, program: commander.Command): Promise<void> => {
  const dir = path.resolve(process.cwd(), projectName)
  console.log()
  if (await checkDirectory(dir)) {
    // return console.log('文件夹已存在')

    const { rewrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'rewrite',
        message: '文件夹已存在，是否覆盖',
        default: false
      }
    ])
    if (rewrite) {
      await Delete(dir)
    } else {
      process.exit(0)
    }
  }

  if (program.vue) {
    const { template } = await new Plugins([
      {
        name: 'cli-plugin-vue',
        apply: VueTemplate
      },
      {
        name: 'cli-plugin-test',
        apply (api: API) {
          api.configWebpack((config) => {
            // console.log('test', config)
            return {}
          })
          return {
            generatorFiles: {}
          }
        }
      }
    ]).run()

    // return
    baseCreate(dir, template, projectName)
  } else if (program.react) {
    const { template } = await new Plugins([
      {
        name: 'cli-plugin-react',
        apply: reactTemplate
      }
    ]).run()

    // return
    baseCreate(dir, template, projectName)
  } else {
    console.log('default')
    const { template } = await new Plugins().run()

    baseCreate(dir, template, projectName)
  }

  // new Generator().run('', generatorProject as unknown as Files)
}

// export default async (projectName: string, options: string[]): Promise<void> => {
//   console.log(projectName, options)
//
//   // const templatePath = path.resolve(__dirname, '../../../template')
//   // const projectPath = path.resolve(process.cwd(), projectName)
//   // fs.mkdirSync(projectPath)
//   // const fileList = fs.readdirSync(templatePath)
//   // const Package = templatePackge
//   // Package.name = projectName
//   // fs.writeFileSync(`${projectPath}/package.json`, JSON.stringify(Package, null, 2))
//   // fileList.map(async file => {
//   //   const exclude = ['dist', 'webpack', 'node_modules', 'yarn.lock', 'package.json', 'package-lock.json', 'project.config.ts']
//   //   const result = exclude.find(item => item === file)

//   //   if (!result) {
//   //     const template = path.resolve(templatePath, file)
//   //     await copy(template, projectPath)
//   //   }
//   // })

//   // const timeout = setTimeout(() => {
//   //   spinner.text = ' 项目创建成功\n'
//   //   spinner.succeed()
//   //   console.log(`  - ${chalk.cyan(`cd ${projectName}`)}`)
//   //   console.log(`  - ${chalk.cyan('npm install')}`)
//   //   console.log(`  - ${chalk.cyan('npm run dev')}`)
//   // }, 4000)

//   // process.on('beforeExit', () => {
//   //   clearTimeout(timeout)
//   // })
// }
