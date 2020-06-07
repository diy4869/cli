/*
 * @Author: last order
 * @Date: 2020-06-04 19:41:35
 * @LastEditTime: 2020-06-05 10:01:20
 */
const fs = require('fs')
const path = require('path')
const fsPromise = fs.promises
// const checkDir = require('./checkDir')

/**
 * @param {string} path 删除的文件或者文件夹
 * @returns {boolean} 是否成功
 */
const Delete = (filePath) => {
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

module.exports = Delete
