/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-23 11:38:50
 */
import { Files } from '@lo_cli/core/src/plugins/generator'
import inquirer = require('inquirer')
import webpack = require('webpack')

export interface API {
  configWebpack (fn: (config?: webpack.Configuration) => webpack.Configuration): void,
  render<T>(path: string, options: T): string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  assignPackage (package?: object): object,
  generator (dir: string, template: Files): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prompt: (list: inquirer.QuestionCollection<unknown>) => Promise<any> & { ui: any }
}

export interface Options {
  generatorFiles: Files
  generatorOptions: {
    [key: string]: unknown
  }
}

export interface ReturnTypes {
  options?: {
    [key: string]: unknown
  },
  generatorFiles: Files,
  config?: webpack.Configuration
}

export interface PluginOptions {
  name: string,
  apply: (api: API, options?: Options) => ReturnTypes | Promise<ReturnTypes>
}
