import baseConfig from 'cli-plugin-default/src/webpack/webpack.base.config'
import userProjectConfig, { Config } from 'cli-plugin-default/src/webpack/utils/getProjectConfig'
import { buildMode, report, server, getPort, program } from '../utils'
import { HOST } from '../config'
// import { getType } from '@lo_cli/utils'
import merge from 'webpack-merge'
import webpack = require('webpack')
import chalk = require('chalk')
import address = require('address')
import dotenv = require('dotenv')
import path = require('path')
import glob = require('glob')
import dotenvExpand = require('dotenv-expand')
import fs = require('fs')
import DotenvWebpack = require('dotenv-webpack')
import FriendlyErrrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

export default class Service {
  pluginWebpackConfig: webpack.Configuration[]
  context: string
  webpackConfig: webpack.Configuration
  userProjectConfig: Config
  constructor () {
    this.userProjectConfig = userProjectConfig()

    this.pluginWebpackConfig = [
      baseConfig()
    ]
    this.webpackConfig = {
      ...baseConfig()
    }
    this.context = process.cwd()
  }

  configWebpack (fn: (config?: webpack.Configuration) => webpack.Configuration): void {
    this.pluginWebpackConfig.push(
      fn()
    )

    // this.webpackConfig = merge(this.webpackConfig, this.pluginWebpackConfig as webpack.Configuration)
    this.webpackConfig = this.pluginWebpackConfig.reduce((total, current) => {
      return merge(total, current)
    }, {})

    fn.call(fn, this.webpackConfig)

    // global.webpackConfig = this.webpackConfig

    // console.log(this.webpackConfig.module.rules)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // return this.webpackConfig
  }

  async dotEnv (mode = 'development'): Promise<{
    [env: string]: number | string
  }> {
    const loadEnv = (): Promise<{
      [env: string]: string
    }> => {
      const dir = path.resolve(this.context)
      return new Promise((resolve, reject) => {
        glob(`{${dir}/**/.env.**,${dir}/**/.env}`, {}, (err, files) => {
          if (err) reject(err)
          const result = files.reduce((total, current) => {
            const env = current.substring(
              current.lastIndexOf('.') + 1
            )
            total[env] = current

            return total
          }, {})

          resolve(result)
        })
      })
    }

    const env = await loadEnv()
    const baseEnv = {
      env: env.env
    }
    baseEnv[mode] = env[mode]

    const result = Object.keys(baseEnv).reduce((total, current) => {
      const e = dotenv.config({
        path: env[current]
      })

      const { parsed } = dotenvExpand(e)

      return Object.assign(total, parsed)
    }, {})

    return result
  }

  async dev (): Promise<void> {
    const log = (PORT: number): void => {
      console.clear()
      // eslint-disable-next-line no-irregular-whitespace
      console.log(`${chalk.bgGreen(`${chalk.black(' DONE ')}`)}　服务启动完成\n\n`)
      console.log('  项目启动成功，地址是:\n')
      console.log(`  - Local:   ${chalk.cyan(`http://localhost:${PORT}`)}`)
      console.log(`  - Network: ${chalk.cyan(`http://${address.ip()}:${PORT}`)}`)
      if (program.report) console.log(`  - Report:  ${chalk.cyan('http://127.0.0.1:8888')}`)
    }
    const env = await this.dotEnv()

    const configList = [
      this.webpackConfig,
      {
        mode: buildMode(program.mode),
        plugins: [
          new webpack.HotModuleReplacementPlugin({
            multiStep: true,
            fullBuildTimeout: 200
          }),
          new webpack.EnvironmentPlugin(Object.keys(env))
          // new FriendlyErrrorsWebpackPlugin({
          //   compilationSuccessInfo: undefined
          //   onErrors (severity, errors) {
          //     console.log(severity)
          //     console.log(errors)
          //     if (severity !== 'error' || severity !== 'warning') {
          //       return undefined
          //     } else {
          //       log(PORT)
          //     }
          //   }
          // })
        ]
      }
    ]

    if (this.userProjectConfig?.configWebpack()) {
      configList.push(this.userProjectConfig?.configWebpack())
    }
    const config = merge(configList)

    this.userProjectConfig?.configWebpack?.call(this, config)
    if (program.report) report(config, program.report)

    const compiler = webpack(config)
    const PORT = await getPort(this?.userProjectConfig?.devServer?.port)
    const devServer = server(
      compiler,
      this?.userProjectConfig?.devServer?.port,
      this?.userProjectConfig?.devServer)

    // compiler.hooks.done.tap('cli-service dev', () => {
    //   // console.log('产生了新的编译')
    //   log(PORT)
    // })
    await (await devServer).listen(PORT, HOST, err => {
      if (err) return console.log(err)
    })
  }

  build (): void {
    console.log('build')
  }
}
