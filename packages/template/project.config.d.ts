/*
 * @Author: last order
 * @Date: 2020-06-06 14:37:42
 * @LastEditTime: 2020-06-07 11:42:18
 */

interface PagesConfig {
  filename: string,
  template: string,
  title?: string,
  inject?: boolean | 'body' | 'head',
  minify?: boolean,
  chunks?: string[]
}

interface PagesInterface {
  [propName: string]: PagesConfig
}

declare interface ProjectConfig {
  publicPath?: string,
  pages?: PagesInterface
}

export default ProjectConfig
