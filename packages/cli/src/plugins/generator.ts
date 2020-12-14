/*
 * @Author: last order
 * @Date: 2020-06-15 11:53:29
 * @LastEditTime: 2020-12-14 16:28:05
 */
import path = require('path')
import fs = require('fs')
import { checkDirectory, mkdir } from '../utils'

interface Files {
  [filepath: string]: string | Buffer | Files
}

export default class Generator {
  generatorFile: Files

  constructor (generatorFile: Files = {}) {
    this.generatorFile = generatorFile
  }

  async run (fileList: Files = this.generatorFile): Promise<void> {
    Object.keys(fileList).forEach(async filepath => {
      if (typeof fileList[filepath] === 'object') {
        if(!await checkDirectory(filepath)) {
          await mkdir(filepath)
          this.run(fileList[filepath] as Files)
        }
      } else {
        fs.writeFileSync(path.resolve(filepath), fileList[filepath] as string | Buffer)
      }
    })
  }
}
