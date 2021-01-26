import webpack = require('webpack')
import WebpackDevServer = require('webpack-dev-server')
import { merge } from 'lodash'

interface PagesConfig {
  filename: string,
  template: string,
  title?: string,
  inject?: boolean | 'body' | 'head',
  minify?: boolean,
  chunks?: string[]
}

interface PagesInterface {
  [propName: string]: PagesConfig
}

interface TerserOptions {
  parallel?: boolean | number,
  dropConsole?: boolean,
  dropDebugger?: boolean
}

export interface Config {
  publicPath?: string,
  pages?: PagesInterface,
  devServer?: WebpackDevServer.Configuration,
  configWebpack?(config?: webpack.Configuration): webpack.Configuration
}

export class ProjectConfig {
  conf: Config
  constructor (config: Config) {
    this.conf = merge({
      publicPath: '',
      devServer: {
        host: 'localhost',
        port: 8080,
        overlay: {
          warnings: false,
          errors: true
        }
      }
    }, config)
  }
}
