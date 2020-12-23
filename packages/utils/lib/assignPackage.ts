/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-14 16:45:00
 */
import { merge } from 'lodash'
import * as projectPackage from 'cli-plugin-default/src/template/package.json'

export const assignPackage = (packages = {}) => {
  return merge(projectPackage, packages)
}
