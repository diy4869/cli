/*
 * @Author: last order
 * @Date: 2020-06-22 16:38:27
 * @LastEditTime: 2020-06-22 16:39:20
 */
import fs = require('fs')

// 检测文件是否存在
const checkFile = (path: string): Promise<boolean> => {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        const res = stats.isFile()
        res ? resolve(true) : resolve(false)
      }
    })
  })
}

export default checkFile
