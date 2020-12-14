/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-12-14 15:08:05
 */
import checkDirectory from './checkDirectory'
import checkFile from './checkFile'
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
  checkFile,
  checkDirectory,
  render,
  copy,
  mkdir,
  Delete
}
