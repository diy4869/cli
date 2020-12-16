/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-16 17:18:40
 */
export default [
  {
    type: 'list',
    name: 'cssPreset',
    choices: [
      {
        name: 'less'
      },
      {
        name: 'sass'
      },
      {
        name: 'scss'
      },
      {
        name: 'stylus'
      }
    ],
    message: '选择预处理器'
  },
  {
    type: 'confirm',
    name: 'useVue3',
    message: '是否使用Vue3'
  },
  {
    type: 'confirm',
    name: 'useTypeScript',
    message: '是否使用TypeScript'
  },
  {
    type: 'list',
    name: 'packageManger',
    choices: [
      {
        name: 'npm'
      },
      {
        name: 'yarn'
      },
      {
        name: 'cnpm'
      }
    ]
  }
]
