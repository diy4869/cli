/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-23 09:41:58
 */
import devConfig from 'cli-plugin-default/src/webpack/webpack.base.config'
import { assignPackage } from '@lo_cli/utils/index'
// import { merge } from 'webpack-merge'
import { render } from '../utils/index'
import { API, PluginOptions, ReturnTypes, Options } from '../types'
// import Generator, { Files } from './generator'
import { merge, assign } from 'lodash'
import { Files } from './generator'
import baseTemplate from 'cli-plugin-default'
import { AsyncSeriesWaterfallHook } from 'tapable'
// import { AsyncSeriesWaterfallHook as Types } from 'tapable/tapable'
import inquirer = require('inquirer')

export default class Plugins {
  plugins: Array<PluginOptions>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hooks: any

  constructor (plugins?: Array<PluginOptions>) {
    this.plugins = []

    const defaultTempte = {
      name: 'cli-plugin-default',
      apply: baseTemplate
    }

    const result = plugins?.reduce((total, current) => {
      return total.concat(this.register(current))
    }, [])

    this.plugins = [defaultTempte, ...result]
  }

  async run (): Promise<Files> {
    const hook = new AsyncSeriesWaterfallHook(['api'])

    let obj: Files = {}
    let generatorOptions: Options = {}

    for (const current of this.plugins) {
      const { plugin, api } = await this.call(current.name)
      hook.tapPromise(plugin.name, async (res: ReturnTypes) => {
        // 插件所返回的webpack配置
        if (res.config) {
          api.config = merge(api.config, res.config)
        }
        // 插件最终需要修改的模板
        if (res.generatorFiles) {
          obj = merge(obj, res.generatorFiles)
        }
        // 插件所提供的prompt选项，如果存在则合并，并传递给下一个插件
        if (res.options) {
          generatorOptions = assign(generatorOptions, res.options)
        }

        return plugin.apply.call(null, api, {
          generatorFiles: obj,
          generatorOptions
        })
      })
    }

    hook.promise('')

    return obj
  }

  register (options: PluginOptions): PluginOptions {
    if (!this.hasPlugin(options.name)) {
      this.plugins.push(options)
      return options
    }
  }

  call (name: string): Promise<{
    plugin: PluginOptions,
    api: API
  }> {
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

        resolve({
          plugin: res,
          api
        })
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
