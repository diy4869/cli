/*
 * @Author: last order
 * @Date: 2020-06-04 19:39:25
 * @LastEditTime: 2020-06-04 19:40:56
 */
const fs = require('fs')

/**
 * @param { string } path 文件路径
 * @returns { boolean } 返回文件夹是否存在
 */
module.exports.checkDir = async path => {
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
