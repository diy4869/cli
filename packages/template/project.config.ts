/*
 * @Author: last order
 * @Date: 2020-06-06 12:59:54
 * @LastEditTime: 2020-06-12 18:05:28
 */
import webpack = require('webpack')
import WebpackDevServer = require('webpack-dev-server')

export class ProjectConfig {
  publicPath?: string = '/'
  pages?: PagesInterface
  devServer?: devServerConfig = {
    overlay: {
      warnings: false,
      errors: true
    }
  }

  terserPlugin?: TerserOptions = {
    parallel: true,
    dropConsole: true,
    dropDebugger: true
  }

  configWebpack?(config?: webpack.Configuration): webpack.Configuration
}

interface devServerConfig {
  overlay?: boolean | {
    warnings?: boolean;
    errors?: boolean;
  }
  proxy?: WebpackDevServer.ProxyConfigMap | WebpackDevServer.ProxyConfigArray,
}
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
