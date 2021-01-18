import baseConfig from 'cli-plugin-default/src/webpack/webpack.base.config'
import { buildMode, report, server, getPort, program } from '../utils'
import { HOST } from '../config'
import merge from 'webpack-merge'
import webpack = require('webpack')
import chalk = require('chalk')
import address = require('address')
import dotenv = require('dotenv')
import path = require('path')
import glob = require('glob')
import dotenvExpand = require('dotenv-expand')

export default class Service {
  webpackConfig: webpack.Configuration
  pluginWebpackConfig: webpack.Configuration[]
  context: string
  constructor () {
    this.webpackConfig = {}
    this.pluginWebpackConfig = [
      // baseConfig()
    ]
    this.context = process.cwd()
  }

  configWebpack (fn: (config?: webpack.Configuration) => webpack.Configuration): void {
    this.pluginWebpackConfig.push(
      fn()
    )

    this.webpackConfig = this.pluginWebpackConfig.reduce((total, current) => {
      return merge(total, current)
    }, {})
    console.log(this.webpackConfig)
    fn.call(fn, this.webpackConfig)
  }

  async dotEnv (mode = 'development'): Promise<void> {
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
    // 加载基础环境
    dotenv.config({
      path: env.env
    })
    // 加载${mode}环境
    dotenv.config({
      path: env[mode]
    })
    dotenvExpand(dotenv)
  }

  async dev (): Promise<void> {
    await this.dotEnv()
    // console.log(process.env)
    return
    // console.log('dev')
    const log = (PORT: number): void => {
      console.clear()
      // eslint-disable-next-line no-irregular-whitespace
      console.log(`${chalk.bgGreen(`${chalk.black(' DONE ')}`)}　服务启动完成\n\n`)
      console.log('  项目启动成功，地址是:\n')
      console.log(`  - Local:   ${chalk.cyan(`http://localhost:${PORT}`)}`)
      console.log(`  - Network: ${chalk.cyan(`http://${address.ip()}:${PORT}`)}`)
      if (program.report) console.log(`  - Report:  ${chalk.cyan('http://127.0.0.1:8888')}`)
    }

    console.log('======', this)
    const config = merge(this.webpackConfig, {
      mode: buildMode(program.mode),
      plugins: [
        new webpack.HotModuleReplacementPlugin({
          multiStep: true,
          fullBuildTimeout: 200
        })
        // new FriendlyErrrorsWebpackPlugin({
        //   compilationSuccessInfo: undefined,
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
    })

    if (program.report) report(config, program.report)
    const userWebpack = config
    const compiler = webpack(userWebpack)
    const devServer = server(compiler)
    const PORT = await getPort()
    // compiler.hooks.done.tap('cli-service dev', () => {
    //   // console.log('产生了新的编译')
    //   log(PORT)
    // })
    await (await devServer).listen(PORT, HOST, err => {
      if (err) return console.log(err)
      // log(PORT)
    })
  }

  build (): void {
    console.log('build')
  }
}
