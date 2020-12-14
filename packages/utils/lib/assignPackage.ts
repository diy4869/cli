/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-14 16:45:00
 */
import * as projectPackage from '@lo_cli/core/src/template/package.json'

export const assignPackage = (packages) => {
  return Object.assign(projectPackage, packages)
}
