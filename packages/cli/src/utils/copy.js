/*
 * @Author: last order
 * @Date: 2020-06-09 16:00:33
 * @LastEditTime: 2020-06-09 17:11:21
 */
const fs = require('fs')
const fsPromise = fs.promises
const utils = require('./utils')
const { checkDirectory } = utils

const copy = (fromPath, toPath) => {
  fsPromise.stat(fromPath).then(async res => {
    if (res.isDirectory()) {
      const checkDir = await checkDirectory(toPath)
      if (checkDir) return console.error('文件夹已存在')
      const path = await fsPromise.readdir(fromPath)
      path.forEach(file => {
        console.log('开始copy文件夹')
        fsPromise.stat(file).then(async res => {
          if (res.isDirectory()) {
            await fsPromise.mkdir(file)
          } else {
            await fsPromise.copyFile(fromPath, toPath)
          }
        })
      })
    } else {
      fsPromise.stat(toPath).then(async res => {
        if (res) return console.error('文件已存在')
        await fsPromise.copyFile(fromPath, toPath)
      })
    }
  })
}

module.exports = copy
