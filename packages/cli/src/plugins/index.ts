/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-15 14:55:56
 */
import devConfig from '@lo_cli/template/webpack/webpack.base.config'
import { assignPackage } from '@lo_cli/utils/index'
import { merge } from 'webpack-merge'
import { render } from '../utils/index'
import { PluginOptions } from '../types'
import Generator, { Files } from './generator'
import webpack = require('webpack')
export default class Plugins {
  plugins: Array<PluginOptions>

  constructor () {
    this.plugins = []
  }

  // 注册插件
  register (options: PluginOptions): void {
    if (!this.hasPlugin(options.name)) {
      this.plugins.push(options)
    }
  }

  // 调用插件
  async call (name: string): Promise<webpack.Configuration> {
    const res = this.plugins.find(item => item.name === name)
    const config = devConfig('development')

    if (res) {
      const api = {
        config,
        render,
        assignPackage,
        generator (files: Files) {
          // eslint-disable-next-line no-new
          new Generator(files)
        }
      }

      const VueTemplateConfig = await res.apply.call(null, api)

      let result
      if (VueTemplateConfig) {
        result = merge(config, VueTemplateConfig)
      } else {
        result = config
      }

      return result
    }
  }

  // 判断插件是否注册
  hasPlugin (name: string): boolean {
    return this.plugins.some(item => item.name === name)
  }
}
