/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-21 15:16:45
 */
import { Files } from '@lo_cli/core/src/plugins/generator'
import inquirer = require('inquirer')
import webpack = require('webpack')

export interface API {
  config: webpack.Configuration,
  render<T>(path: string, options: T): string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  assignPackage (package): object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prompt: (list: inquirer.QuestionCollection<unknown>) => Promise<any> & { ui: any }
}

export interface Options {
  [key: string]: unknown
}

export interface ReturnTypes {
  options?: Options,
  generatorFiles: Files,
  config?: webpack.Configuration
}

export interface PluginOptions {
  name: string,
  apply: (api: API, options?: Options) => ReturnTypes | Promise<ReturnTypes>
}
