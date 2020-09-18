import inquirer = require('inquirer')

export default () => {
  return inquirer.prompt([
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
      type: 'list',
      name: 'mobile',
      message: '选择终端',
      choices: [
        {
          name: 'mobile'
        },
        {
          name: 'pc'
        }
      ]
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
    }
  ])
}
