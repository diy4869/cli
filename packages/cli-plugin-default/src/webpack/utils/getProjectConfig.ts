/*
 * @Author: last order
 * @Date: 2020-06-12 17:37:03
 * @LastEditTime: 2020-12-18 10:57:20
 */
import { Config } from 'cli-plugin-default/src/webpack/project.config'
import fs = require('fs')
import path = require('path')

export {
  Config
}

export default function test (): Config {
    const projectConfigPath = path.resolve(process.cwd(), './project.config.ts')

    // const stat = fs.statSync(projectConfigPath)

    const ProjectConfig = require(projectConfigPath).default

    return ProjectConfig.conf
}
