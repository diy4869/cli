/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-05-29 18:51:23
 */
const fs = require('fs')
const path = require('path')

/**
 * @param { string } dir 文件路径
 */
exports.resolveDir = dir => path.join(__dirname, dir)

/**
 * @param { string } path 文件路径
 * @returns { boolean } 返回文件夹是否存在
 */
exports.checkDir = async path => {
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
