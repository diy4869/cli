/*
 * @Author: last order
 * @Date: 2020-06-04 19:41:35
 * @LastEditTime: 2020-06-22 17:02:24
 */
import fs = require('fs')
import path = require('path')

/**
 * @param {string} filePath 删除的文件或者文件夹
 */
const Delete = (filePath: string): void => {
  const stats = fs.statSync(filePath)
  if (stats.isDirectory()) {
    const files = fs.readdirSync(filePath, {
      encoding: 'utf-8'
    })
    files.forEach(file => {
      const str = filePath + path.sep + file
      const stats = fs.statSync(str)
      stats.isDirectory() ? Delete(str) : fs.unlinkSync(str)
    })
    fs.rmdirSync(filePath)
  } else {
    fs.unlinkSync(filePath)
  }
}

export default Delete
