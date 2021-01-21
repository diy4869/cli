/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-23 10:06:33
 */
export default [
  {
    type: 'confirm',
    name: 'useVue3',
    message: '是否使用Vue3'
  },
  {
    type: 'confirm',
    name: 'useRouterAndVuex',
    message: '是否使用vue-router和vuex',
    default: true
  },
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
  }
  // {
  //   type: 'list',
  //   name: 'packageManger',
  //   choices: [
  //     {
  //       name: 'npm'
  //     },
  //     {
  //       name: 'yarn'
  //     },
  //     {
  //       name: 'cnpm'
  //     }
  //   ]
  // }
]
