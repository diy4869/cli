/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-06-09 15:27:45
 */
const path = require('path')
const checkDirectory = require('./checkDirectory')

/**
 * @param { string } dir 文件路径
 */
module.exports = {
  resolveDir: dir => path.join(__dirname, dir),
  checkDirectory
}
