/*
 * @Author: last order
 * @Date: 2020-06-15 11:53:29
 * @LastEditTime: 2020-12-17 15:30:33
 */
import { checkDirectory, mkdir } from '../utils'
import fs = require('fs')

export interface Files {
  [filepath: string]: string | Buffer | Files
}

export default class Generator {
  generatorFile: Files

  constructor (generatorFile: Files = {}) {
    this.generatorFile = generatorFile
  }

  async run (genenatorPath: string, fileList: Files = this.generatorFile): Promise<void> {
    if (!await checkDirectory(genenatorPath)) {
      await mkdir(genenatorPath)
    }

    Object.keys(fileList).forEach(async filepath => {
      const outputPath = `${genenatorPath}/${filepath}`
      if (typeof fileList[filepath] === 'object') {
        if (!await checkDirectory(filepath)) {
          await mkdir(outputPath)
          this.run(outputPath, fileList[filepath] as Files)
        }
      } else {
        fs.writeFileSync(outputPath, fileList[filepath] as string | Buffer)
      }
    })
  }
}
