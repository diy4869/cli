/*
 * @Author: last order
 * @Date: 2020-06-04 19:39:25
 * @LastEditTime: 2020-06-10 14:57:33
 */
import fs = require('fs')

/**
 * @param { string } path 文件路径
 */
export default async (path: string): Promise<boolean> => {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        const res = stats.isDirectory()
        res ? resolve(true) : resolve(false)
      }
    })
  })
}
