/*
 * @Author: last order
 * @Date: 2020-06-06 15:18:42
 * @LastEditTime: 2020-06-08 15:21:04
 */
import userWebpackConfig from 'project.config'
import HtmlWebpackPlugin = require('html-webpack-plugin')

interface BaseInterface {
  pageKey: string[],
  pages: string
}

interface WebpackEntry {
  [propName: string]: string
}

export default {
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
