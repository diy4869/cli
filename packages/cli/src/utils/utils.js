/*
 * @Author: last order
 * @Date: 2020-05-29 14:37:45
 * @LastEditTime: 2020-06-04 19:41:27
 */
const path = require('path')
const checkDir = require('./checkDir')

/**
 * @param { string } dir 文件路径
 */
exports.resolveDir = dir => path.join(__dirname, dir)
exports.checkDir = checkDir
