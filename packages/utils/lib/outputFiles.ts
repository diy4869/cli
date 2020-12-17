/*
 * @Author: last order
 * @Date: 2020-12-15 15:37:56
 * @LastEditTime: 2020-12-17 16:56:31
 */
import { checkDirectory, mkdir } from '@lo_cli/core/src/utils'
import { Files } from '@lo_cli/core/src/plugins/generator'
import fs = require('fs')

export const outputFiles = async (filePath: string) => {
  const fn = async (dir, obj = {}): Promise<Files> => {
    const dirList = fs.readdirSync(dir)
    for (const item of dirList) {
      const filepath = `${dir}/${item}`
      if (await checkDirectory(filepath)) {
        obj[item] = {}
        await mkdir(filepath)
        await fn(filepath, obj[item])
      } else {
        obj[item] = fs.readFileSync(filepath, {
          encoding: 'utf-8'
        })
        // obj[item] = ''
      }
    }

    return obj
  }

  return fn(filePath)
}
