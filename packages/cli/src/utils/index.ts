/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-06-17 13:18:53
 */
import checkDirectory from './checkDirectory'
import copy from './copy'
import path = require('path')

export const resolveDir = (dir: string): string => path.join(__dirname, dir)

export {
  checkDirectory,
  copy
}
