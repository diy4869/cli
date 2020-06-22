/*
 * @Author: last order
 * @Date: 2020-06-22 14:23:11
 * @LastEditTime: 2020-06-22 15:23:22
 */
import checkDirectory from './checkDirectory'
import fs = require('fs')
import path = require('path')

const mkdir = (Path: string): Promise<boolean> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const dirname = path.resolve(Path)
    /**
     * path.sep 处理win mac下的文件分隔符
     * win是\ mac是/
     */
    const arr = dirname.split(path.sep)
    let str = ''
    for (let i = 0; i < arr.length; i++) {
      str = str + arr[i] + '/'
      if (!await checkDirectory(str)) {
        fs.mkdirSync(str)
      }
    }
    resolve(true)
  })
}

export default mkdir
