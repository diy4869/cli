/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-06-22 17:07:49
 */
import checkDirectory from './checkDirectory'
import mkdir from './mkdir'
import copy from './copy'
import Delete from './delete'
import path = require('path')

export const resolveDir = (dir: string): string => path.resolve(__dirname, dir)

export {
  checkDirectory,
  copy,
  mkdir,
  Delete
}
