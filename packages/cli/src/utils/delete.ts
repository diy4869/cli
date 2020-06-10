/*
 * @Author: last order
 * @Date: 2020-06-04 19:41:35
 * @LastEditTime: 2020-06-10 14:43:50
 */
import fs = require('fs')
import path = require('path')

const fsPromise = fs.promises

/**
 * @param {string} filePath 删除的文件或者文件夹
 */
const Delete = (filePath: string): void => {
  fsPromise.stat(filePath).then(async res => {
    if (res.isDirectory()) {
      fsPromise.readdir(filePath, {
        encoding: 'utf-8'
      }).then(res => {
        console.log(res)
        res.forEach(item => {
          const dir = path.resolve(__dirname, filePath, item)
          console.log(dir)
          const stats = fs.statSync(dir)
          stats && stats.isDirectory() ? Delete(dir) : fs.unlinkSync(filePath)
        })
        fs.rmdirSync(filePath)
      })
    } else {
      const removeFile = await fsPromise.unlink(filePath)
      console.log(removeFile)
    }
  })
}
Delete('../test')

export default Delete
