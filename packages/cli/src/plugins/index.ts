/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-18 17:36:01
 */
import devConfig from 'cli-plugin-default/src/webpack/webpack.base.config'
import { assignPackage } from '@lo_cli/utils/index'
// import { merge } from 'webpack-merge'
import { render } from '../utils/index'
import { PluginOptions, ReturnTypes } from '../types'
// import Generator, { Files } from './generator'
import { merge } from 'lodash'
import { Files } from './generator'
import { AsyncSeriesWaterfallHook } from 'tapable'
// import { AsyncSeriesWaterfallHook as Types } from 'tapable/tapable'
import inquirer = require('inquirer')

export default class Plugins {
  plugins: Array<PluginOptions>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hooks: any

  constructor (plugins?: Array<PluginOptions>) {
    this.plugins = []
    this.hooks = new AsyncSeriesWaterfallHook(['api'])

    this.plugins = plugins?.map(item => this.register(item))
  }

  async run (): Promise<Files> {
    const list = []
    for (const current of this.plugins) {
      const result = await this.call(current.name)
      list.push(result.generatorFiles)
    }
    const obj: Files = merge({}, ...list)

    return obj
  }

  register (options: PluginOptions): PluginOptions {
    if (!this.hasPlugin(options.name)) {
      this.plugins.push(options)
      return options
    }
  }

  // 调用插件
  call (name: string): Promise<ReturnTypes> {
    return new Promise((resolve, reject) => {
      const res = this.plugins.find(item => item.name === name)
      const config = devConfig('development')

      if (res) {
        const api = {
          config,
          render,
          assignPackage,
          prompt: question => inquirer.prompt(question)
        }

        const pluginTemplateConfig = res.apply.call(null, api)

        resolve(pluginTemplateConfig)
        // this.hooks.tapPromise(name, result => res.apply.call(this, api, result))

        // resolve()
      } else {
        reject(
          new Error(`${name} 没有注册`)
        )
      }
    })
  }

  // 判断插件是否注册
  hasPlugin (name: string): boolean {
    return this.plugins.some(item => item.name === name)
  }
}
