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
