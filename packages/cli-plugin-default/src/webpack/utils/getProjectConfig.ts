/*
 * @Author: last order
 * @Date: 2020-06-12 17:37:03
 * @LastEditTime: 2020-12-18 10:57:20
 */
import { ProjectConfig as userWebpackConfig } from 'cli-plugin-default/src/template/project.config'
import fs = require('fs')
import path = require('path')



export default (): userWebpackConfig => {
  try {

  } catch (err) {
    const projectConfigPath = path.resolve(process.cwd(), './src/project.config.ts')
    console.log(projectConfigPath)
    const stat = fs.statSync(projectConfigPath)

    if (stat) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ProjectConfig } = require(projectConfigPath)
      const config = new ProjectConfig()
      return config
    }
  }

}
