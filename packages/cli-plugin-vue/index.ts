import config from './config/index'
import VueLoaderPlguin = require('vue-loader/lib/index')

export default async (webpackConfig) => {
  const result = await config()

  const webpackVueConfig = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlguin.VueLoaderPlugin()
    ]
  }
  return webpackVueConfig
}
