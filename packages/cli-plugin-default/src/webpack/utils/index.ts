/*
 * @Author: last order
 * @Date: 2020-06-06 15:18:42
 * @LastEditTime: 2020-06-12 18:43:03
 */
import getProjectConfig from './getProjectConfig'
import HtmlWebpackPlugin = require('html-webpack-plugin')

interface BaseInterface {
  pageKey: string[],
  pages: string
}

interface WebpackEntry {
  [propName: string]: string
}
const userWebpackConfig = () => getProjectConfig()

const multiPage = {
  base (): BaseInterface {
    const [pages] = Object.keys(userWebpackConfig)
    const pageKey = Object.keys(userWebpackConfig[pages])

    return {
      pageKey,
      pages
    }
  },
  entry (): WebpackEntry {
    const { pages, pageKey } = this.base()
    const obj = {}

    pageKey.forEach((page: string) => {
      const template = userWebpackConfig[pages][page]
      obj[page] = template.entry
    })

    return obj
  },
  page (): HtmlWebpackPlugin[] {
    const { pages, pageKey } = this.base()
    const arr = []
    pageKey.forEach((page: string) => {
      const config = userWebpackConfig[pages][page]
      const template = new HtmlWebpackPlugin({
        title: config.title,
        filename: config.filename,
        template: config.template,
        inject: true,
        minify: true,
        chunks: [page]
      })

      arr.push(template)
    })

    return arr
  }
}

export default multiPage
