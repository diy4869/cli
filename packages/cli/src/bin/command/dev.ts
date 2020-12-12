
import { buildMode, report, server, getPort, program, userWebpackConfig } from '../../utils'
import webpackBaseConfig from '@lo_cli/template/webpack/webpack.base.config'
// import s from '@lo-cli/template/'
import { HOST } from '../../config'
import { merge } from 'webpack-merge'
import webpack = require('webpack')
import chalk = require('chalk')
import address = require('address')

const log = (PORT: number): void => {
  console.clear()
  // eslint-disable-next-line no-irregular-whitespace
  console.log(`${chalk.bgGreen(`${chalk.black(' DONE ')}`)}　服务启动完成\n\n`)
  console.log('  项目启动成功，地址是:\n')
  console.log(`  - Local:   ${chalk.cyan(`http://localhost:${PORT}`)}`)
  console.log(`  - Network: ${chalk.cyan(`http://${address.ip()}:${PORT}`)}`)
  if (program.report) console.log(`  - Report:  ${chalk.cyan('http://127.0.0.1:8888')}`)
}

export default async function (): Promise<void> {
  const config = merge(webpackBaseConfig(program.mode), {
    mode: buildMode(program.mode),
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
        fullBuildTimeout: 200
      })
    ]
  })
  if (program.report) report(config, program.report)
  const userWebpack = merge(
    config,
    userWebpackConfig?.configWebpack?.call(null, config, process.env.NODE_ENV)
  )

  const compiler = webpack(userWebpack)
  const devServer = server(compiler)
  const PORT = await getPort()
  compiler.watch({
    aggregateTimeout: 300, // 构建前的延迟，默认300
    poll: undefined,
    ignored: /node_modules/
  }, (_, stats) => {
    console.log(stats)
  })
  await (await devServer).listen(PORT, HOST, err => {
    if (err) return console.log(err)
    log(PORT)
  })
  compiler.hooks.compilation.tap('compilation', () => {
    console.log('产生了新的编译')
    log(PORT)
  })
}
