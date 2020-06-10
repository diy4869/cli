/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-06-10 14:57:22
 */
import checkDirectory from './checkDirectory'
import path = require('path')

export const resolveDir = (dir: string): string => path.join(__dirname, dir)

export {
  checkDirectory
}
