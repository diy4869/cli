/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-14 16:45:15
 */
import { exec } from 'child_process'

function checkManger (command: string): Promise<Boolean> {
  return new Promise(resolve => {
    exec(command, (err, stdout, stderr) => {
      err || stderr ? resolve(false) : resolve(true)
    })
  })
}

export function hasYarn () {
  return checkManger('yarn --version')
}

export function hasCnpm () {
  return checkManger('cnpm --version')
}
