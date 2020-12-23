/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-12-23 11:20:20
 */
import checkDirectory from './checkDirectory'
import checkFile from './checkFile'
import mkdir from './mkdir'
import copy from './copy'
import Delete from './delete'
import render from './render'
import { Command } from 'commander'
import getProjectConfig from 'cli-plugin-default/src/webpack/utils/getProjectConfig'
import path = require('path')

export const userWebpackConfig = getProjectConfig()
export const program = new Command()
export const resolveDir = (dir: string): string => path.resolve(__dirname, dir)
export const getExt = (str: string): string => str.substring(str.lastIndexOf('.'))

export * from './webpackUtils'
export {
  checkFile,
  checkDirectory,
  render,
  copy,
  mkdir,
  Delete
}
