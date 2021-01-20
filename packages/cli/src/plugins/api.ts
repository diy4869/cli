import { assignPackage } from '@lo_cli/utils/index'
import { render } from '../utils/index'
import { API } from '../types'
import Generator from './generator'
import Service from './service'
import inquirer = require('inquirer')

export const service = new Service()

export let config

const api: API = {
  configWebpack (fn) {
    config = service.configWebpack(fn)
  },
  render,
  assignPackage,
  generator (dir, template) {
    new Generator().run(dir, template)
  },
  prompt: (question: inquirer.QuestionCollection<unknown>) => inquirer.prompt(question)
}

export default api
