/*
 * @Author: last order
 * @Date: 2020-05-28 20:26:08
 * @LastEditTime: 2020-05-29 18:54:10
 */
const inquirer = require('inquirer')
const download = require('download-git-repo')
const ora = require('ora')

inquirer
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
  ]).then(res => {
    console.log(res)
    const spinner = ora({
      text: '正在努力下载模板中...'
    })
    spinner.start()
    download('diy4869/LoPlayer', 'test', (err) => {
      if (err) {
        spinner.color = 'red'
        spinner.text = '下载失败'
        spinner.stop()
        Promise.reject(err)
        process.exit(1)
      } else {
        spinner.text = '模板下载成功'
        spinner.succeed()
      }
    })
  }).catch(err => {
    console.log(err)
    console.log('===========')
  })
