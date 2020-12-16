/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-15 11:11:30
 */
import { Files } from '@lo_cli/core/src/plugins/generator'
import webpack = require('webpack')

export interface API {
  config: webpack.Configuration,
  render<T>(path: string, options: T): string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  assignPackage (package): object,
  generator(files: Files): void
}

export interface PluginOptions {
  name: string,
  apply: (api: API) => Promise<webpack.Configuration>
}
