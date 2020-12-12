import webpackProdConfig from '@lo_cli/template/webpack/webpack.prod.config'
// import webpackProdConfig from '@lo-cli/template/'
import { buildMode, report, program, userWebpackConfig } from '@/utils'
import { merge } from 'webpack-merge'
import webpack = require('webpack')
import chalk = require('chalk')

export default async function (): Promise<void> {
  const config = merge(webpackProdConfig(), {
    mode: buildMode(program.mode)
  })

  if (program.report) report(config, program.report)
  const userWebpack = merge(
    config,
    userWebpackConfig?.configWebpack?.call(null, config, process.env.NODE_ENV)
  )
  const compiler = webpack(userWebpack)
  console.log(compiler.options)
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      // eslint-disable-next-line no-irregular-whitespace
      console.log(`${chalk.bgRed(`${chalk.black(' ERROR ')}`)}　编译出错\n`)
      console.log(err)
      console.log(stats.compilation.errors[0])
    } else {
      // eslint-disable-next-line no-irregular-whitespace
      console.log(`${chalk.bgGreen(`${chalk.black(' DONE ')}`)}　编译完成\n`)
      const log = stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })
      process.stdout.write(log + '\n\n')
    }
  })
}
