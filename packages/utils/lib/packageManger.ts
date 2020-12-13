import { exec } from 'child_process'
import { promisify } from 'util'

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
