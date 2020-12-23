/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-23 11:39:03
 */
import devConfig from 'cli-plugin-default/src/webpack/webpack.base.config'
import { assignPackage } from '@lo_cli/utils/index'
import { merge as WebpackMerge } from 'webpack-merge'
import { render } from '../utils/index'
import { API, PluginOptions, ReturnTypes } from '../types'
// import Generator, { Files } from './generator'
import { merge, assign } from 'lodash'
import { Files } from './generator'
import baseTemplate from 'cli-plugin-default'
import { AsyncSeriesWaterfallHook } from 'tapable'
import fs = require('fs')
import path = require('path')
import inquirer = require('inquirer')
import webpack = require('webpack')

export default class Plugins {
  plugins: Array<PluginOptions>
  api?: API

  constructor (plugins?: Array<PluginOptions>) {
    this.api = {
      config: devConfig(),
      render,
      assignPackage,
      prompt: question => inquirer.prompt(question)
    }
    this.plugins = []

    const defaultTempte = {
      name: 'cli-plugin-default',
      apply: baseTemplate
    }
    if (plugins) {
      const result = plugins?.reduce((total, current) => {
        return total.concat(this.register(current))
      }, [])
      this.plugins = [defaultTempte, ...result]
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  getPackage (): object {
    return assignPackage()
  }

  async run (): Promise<{
    template: Files,
    webpackConfig: webpack.Configuration
  }> {
    const hook = new AsyncSeriesWaterfallHook(['api'])
    const list: Files[] = []

    let obj: Files = {}
    let generatorOptions = {}

    for (const current of this.plugins) {
      const plugin = await this.call(current.name)
      hook.tapPromise(plugin.name, async (res: ReturnTypes) => {
        // 插件所返回的webpack配置
        if (res.config) {
          this.api.config = WebpackMerge(this.api.config, res.config)
        }
        // 插件最终需要修改的模板
        if (res.generatorFiles) {
          list.push(res.generatorFiles)
          obj = merge(obj, ...list)
        }
        // 插件所提供的prompt选项，如果存在则合并，并传递给下一个插件
        if (res.options) {
          generatorOptions = assign(generatorOptions, res.options)
        }

        return plugin.apply.call(null, this.api, {
          generatorFiles: obj,
          generatorOptions
        })
      })
    }

    const res = await hook.promise('') as ReturnTypes
    const template = merge(obj, res?.generatorFiles)

    template['package.json'] = JSON.stringify(this.getPackage(), null, 2)
    this.api.config = WebpackMerge(this.api.config, res.config)

    return {
      template,
      webpackConfig: this.api.config
    }
  }

  register (options: PluginOptions): PluginOptions {
    if (!this.hasPlugin(options.name)) {
      this.plugins.push(options)
      return options
    }
  }

  call (name: string): Promise<PluginOptions> {
    return new Promise((resolve, reject) => {
      const res = this.plugins.find(item => item.name === name)

      if (res) {
        resolve(res)
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
