/*
 * @Author: last order
 * @Date: 2020-06-04 18:48:24
 * @LastEditTime: 2020-06-05 11:07:41
 */
const inquirer = require('inquirer')

const config = inquirer
  .prompt([
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

module.exports = config
