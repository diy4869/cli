/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-16 17:29:37
 */
import devConfig from 'cli-plugin-default/src/webpack/webpack.base.config'
import { assignPackage } from '@lo_cli/utils/index'
// import { merge } from 'webpack-merge'
import { render } from '../utils/index'
import { PluginOptions } from '../types'
import inquirer = require('inquirer')
// import Generator, { Files } from './generator'

export default class Plugins {
  plugins: Array<PluginOptions>

  constructor (plugins: Array<PluginOptions>) {
    this.plugins = []

    this.plugins = plugins.map(item => this.register(item))
  }

  run (): void {
    Promise.all(
      this.plugins.map(item => {
        return this.call(item.name)
      })
    ).then(res => {
      console.log(res)
    })
  }

  register (options: PluginOptions): PluginOptions {
    if (!this.hasPlugin(options.name)) {
      this.plugins.push(options)
      return options
    }
  }

  // 调用插件
  async call (name: string): Promise<void> {
    const res = this.plugins.find(item => item.name === name)
    const config = devConfig('development')
    // const question = []
    if (res) {
      const api = {
        config,
        render,
        assignPackage,
        prompt: async list => await inquirer.prompt(list)
      }

      const pluginTemplateConfig = await res.apply.call(null, api)

      return pluginTemplateConfig
    }
  }

  // 判断插件是否注册
  hasPlugin (name: string): boolean {
    return this.plugins.some(item => item.name === name)
  }
}
