/*
 * @Author: last order
 * @Date: 2020-05-28 20:26:08
 * @LastEditTime: 2020-06-10 15:04:51
 */
import config from './config'
import download from './download'
import ora = require('ora')

config.then(res => {
  console.log(res)

  const spinner = ora({
    text: '正在努力下载模板中...'
  })

  spinner.start()
  download('diy4869/LoPlayer', '../test').then(() => {
    spinner.text = '模板下载成功'
    spinner.succeed()
  }).catch(() => {
    spinner.color = 'red'
    spinner.text = '下载失败'
    spinner.stop()
  })
})

export default config
