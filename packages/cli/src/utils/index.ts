/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-06-22 17:07:49
 */
import checkDirectory from './checkDirectory'
import mkdir from './mkdir'
import copy from './copy'
import Delete from './delete'
import render from './render'
import { Command } from 'commander'
import getProjectConfig from '../../../template/webpack/utils/getProjectConfig'
import path = require('path')

export const userWebpackConfig = getProjectConfig()
export * from './webpackUtils'
export const program = new Command()
export const resolveDir = (dir: string): string => path.resolve(__dirname, dir)
export {
  checkDirectory,
  render,
  copy,
  mkdir,
  Delete
}
