import { prompt } from 'inquirer'

const config = prompt([
  {
    type: 'confirm',
    name: 'useTypeScript',
    message: '是否使用TypeScript'
  }
])

export default config
