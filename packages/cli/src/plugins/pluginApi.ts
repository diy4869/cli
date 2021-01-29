import { assignPackage } from '@lo_cli/utils/index'
import { render } from '../utils/index'
import { Files } from '../types'
import Generator from './generator'
import inquirer = require('inquirer')
import PromptUI = require('inquirer/lib/ui/prompt')
import webpack = require('webpack')

export default class Api {
  config: webpack.Configuration[]
  constructor () {
    this.config = []
  }

  addWebpack (config: webpack.Configuration): void {
    // configWebpack(fn)
    this.config.push(config)
  }

  render<T> (path: string, options: T): string {
    return render(path, options)
  }

  assignPackage (obj = {}): unknown {
    return assignPackage(obj)
  }

  generator (dir: string, template: Files): void {
    new Generator().run(dir, template)
  }

  prompt (question: inquirer.QuestionCollection<unknown>): Promise<unknown> & {
    ui: PromptUI;
} {
    return inquirer.prompt(question)
  }
}
