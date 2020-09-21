import devConfig from '../../../template/webpack/webpack.base.config'
import { render } from '../utils/index'
import merge = require('webpack-merge')
import webpack = require('webpack')

interface PluginOptions {
  name: string,
  apply(config: webpack.Configuration): webpack.Configuration | Promise<webpack.Configuration>
}

export default class Plugins {
  plugins: PluginOptions[]

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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async call (name: string) {
    const res = this.plugins.find(item => item.name === name)

    const config = devConfig('development')
    if (res) {
      const VueTemplateConfig = await res.apply.call(null, {
        config,
        render
      })
      const result = merge(config, VueTemplateConfig)

      return result
    }
  }

  // 判断插件是否注册
  hasPlugin (name: string): boolean {
    return this.plugins.some(item => item.name === name)
  }
}
