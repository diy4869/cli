/*
 * @Author: last order
 * @Date: 2020-06-09 16:00:33
 * @LastEditTime: 2020-06-18 15:30:03
 */
import checkDirectory from './checkDirectory'
import fs = require('fs')
import path = require('path')

const fsPromise = fs.promises

const copy = (fromPath: string, toPath: string): Promise<boolean> => {
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

  // 复制文件
  const copyFile = (fromPath: string, toPath: string): Promise<boolean> => {
    return new Promise(resolve => {
      fsPromise.stat(fromPath).then(async stat => {
        if (stat?.isFile()) {
          if (!await checkFile(toPath)) {
            // 如果toPath是文件夹就截取fromPath的文件名，然后在拷贝，否则直接拷贝
            if (await checkDirectory(toPath)) {
              const resolvePath = path.resolve(fromPath)
              const start = resolvePath.lastIndexOf('\\')
              const substr = resolvePath.substr(start + 1, fromPath.length)
              await fsPromise.copyFile(resolvePath, path.resolve(toPath, substr))
            } else {
              console.log(toPath)
              await fsPromise.copyFile(fromPath, toPath)
            }
          }
        }
        resolve(true)
      })
    })
  }

  // 复制
  return new Promise(resolve => {
    fsPromise.stat(fromPath).then(async res => {
      if (res.isDirectory()) {
        const filePath = fs.readdirSync(fromPath)
        if (!await checkDirectory(toPath)) {
          fs.mkdirSync(toPath)
        }
        filePath.map(async file => {
          const startPath = fromPath + '/' + file
          const endPath = toPath + '/' + file
          fsPromise.stat(startPath).then(async res => {
            res.isFile() ? await copyFile(startPath, endPath) : await copy(startPath, endPath)
          })
        })
      } else {
        await copyFile(fromPath, toPath)
      }
    })
    resolve(true)
  })
}

export default copy
