/*
 * @Author: last order
 * @Date: 2020-12-16 09:29:21
 * @LastEditTime: 2020-12-21 14:15:36
 */
import { API, ReturnTypes } from '@lo_cli/core/src/types'
import { outputFiles } from '@lo_cli/utils/index'
import generatorOptions from './src/config/index'
import path = require('path')

export default async function baseTemplate (api: API): Promise<ReturnTypes> {
  const options = await api.prompt(generatorOptions)
  return {
    options: options,
    generatorFiles: await outputFiles(path.resolve(__dirname, './src/template'))
  }
}
