/*
 * @Author: last order
 * @Date: 2020-06-09 16:00:33
 * @LastEditTime: 2020-07-30 14:05:09
 */
import checkDirectory from './checkDirectory'
import checkFile from './checkFile'
// import mkdir from './mkdir'
import fs = require('fs')
import path = require('path')

const fsPromise = fs.promises

/**
 * @desc 复制文件
 * @param {string} fromPath 复制的文件或文件夹
 * @param {string} toPath 如果toPath既不是文件也不是文件夹将会直接被重命名
 */
const copy = (fromPath: string, toPath: string): Promise<boolean> => {
  const from = path.resolve(fromPath)
  const to = path.resolve(toPath)

  // 复制文件
  const copyFile = (fromPath: string, toPath: string): Promise<boolean> => {
    return new Promise(resolve => {
      fsPromise.stat(fromPath).then(async stat => {
        const resolvePath = path.resolve(fromPath)
        const start = resolvePath.lastIndexOf(path.sep)
        const substr = resolvePath.substr(start + 1, fromPath.length)

        if (stat?.isFile()) {
          if (!await checkFile(toPath)) {
            // 如果toPath是文件夹就截取fromPath的文件名，然后在拷贝，否则直接拷贝
            if (await checkDirectory(toPath)) {
              await fsPromise.copyFile(resolvePath, path.resolve(toPath, substr))
            } else {
              await fsPromise.copyFile(resolvePath, toPath)
            }
          }
        }
        resolve(true)
      })
    })
  }

  // 复制文件夹
  const copyDirectory = async (fromPath: string, toPath: string): Promise<boolean> => {
    return new Promise(resolve => {
      fsPromise.stat(fromPath).then(async stats => {
        if (stats.isDirectory()) {
          if (!await checkDirectory(toPath)) {
            fs.mkdirSync(toPath)
          }
          const filePath = fs.readdirSync(fromPath)
          filePath.map(async file => {
            const startPath = fromPath + path.sep + file
            const endPath = toPath + path.sep + file
            fsPromise.stat(startPath).then(async res => {
              res.isFile() ? await copyFile(startPath, endPath) : await copyDirectory(startPath, endPath)
            })
          })
          resolve(true)
        }
      })
    })
  }

  // 复制
  return new Promise(resolve => {
    fsPromise.stat(from).then(async res => {
      if (res.isDirectory()) {
        if (!await checkDirectory(to)) {
          fs.mkdirSync(to)
          copyDirectory(from, to)
        } else {
          const start = from.lastIndexOf(path.sep)
          const substr = from.substr(start + 1, from.length)
          await copyDirectory(from, path.resolve(to, substr))
        }
      } else {
        await copyFile(from, to)
      }
    })
    resolve(true)
  })
}

export default copy
