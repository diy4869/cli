/*
 * @Author: last order
 * @Date: 2020-06-04 18:48:24
 * @LastEditTime: 2020-06-15 11:10:49
 */
import { prompt } from 'inquirer'

const config = prompt([
  {
    type: 'confirm',
    name: 'useTypeScript',
    message: '是否使用TypeScript'
  }
])

export default config
