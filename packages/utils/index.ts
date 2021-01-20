/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-15 15:40:24
 */
import { assignPackage } from './lib/assignPackage'

export * from './lib/packageManger'
export * from './lib/outputFiles'
export {
  assignPackage
}
export function getType <T>(str: T): string {
  const type = Object.prototype.toString.call(str)
  const substr = type.substring(8, type.length - 1)

  return substr.toLowerCase()
}
