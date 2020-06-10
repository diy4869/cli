/*
 * @Author: last order
 * @Date: 2020-06-04 18:48:24
 * @LastEditTime: 2020-06-10 14:35:40
 */
import { prompt } from 'inquirer'

const config = prompt([
  {
    type: 'confirm',
    name: 'useTypeScript',
    message: '是否使用TypeScript'
  },
  {
    type: 'confirm',
    name: 'ssr',
    message: '是否使用SSR'
  },
  {
    type: 'confirm',
    name: 'mobile',
    message: '是否移动端'
  },
  {
    type: 'rawlist',
    name: 'ui',
    message: '选择需要用的ui库',
    choices: ['element-ui', 'vant']
  }
])

export default config
