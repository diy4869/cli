/*
 * @Author: last order
 * @Date: 2020-06-12 17:37:03
 * @LastEditTime: 2020-06-12 18:47:37
 */
import { ProjectConfig as userWebpackConfig } from '../../project.config'
import fs = require('fs')
import path = require('path')

const projectConfigPath = path.resolve(__dirname, '../../project.config.ts')

export default (): userWebpackConfig => {
  const stat = fs.statSync(projectConfigPath)

  if (stat) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ProjectConfig } = require(projectConfigPath)
    const config = new ProjectConfig()

    return config
  }
}
