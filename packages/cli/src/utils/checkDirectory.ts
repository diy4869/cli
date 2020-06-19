/*
 * @Author: last order
 * @Date: 2020-06-04 19:39:25
 * @LastEditTime: 2020-06-19 11:56:16
 */
import fs = require('fs')

/**
 * @param { string } path 文件路径
 * @description 检查文件夹是否存在
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
