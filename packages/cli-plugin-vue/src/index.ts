/*
 * @Author: last order
 * @Date: 2020-12-14 16:43:51
 * @LastEditTime: 2020-12-15 17:08:34
 */
import generatorOptions from './config/index'
import { API } from '@lo_cli/core/src/types'
import webpack = require('webpack')
// import { outputFiles } from '@lo_cli/utils/index'

export default async function VueTemplate (api: API): Promise<webpack.Configuration> {
  const options = await generatorOptions()
  const VueWebpackConfig: webpack.Configuration = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.vue']
    },
    plugins: []
  }

  if (!options.useVue3) {
    api.assignPackage({
      dependencies: {
        'vue': '2.6.12',
        'vue-router': '',
        'vuex': ''
      },
      devDependencies: {
        'vue-template-compiler': '2.6.12',
        'vue-loader': '15.9.5'
      }
    })

    try {
      const VueLoaderPlguin = require('vue-loader/dist/plugin').default
      VueWebpackConfig.plugins.push(
        new VueLoaderPlguin()
      )
    } catch (err) {}
  } else {
    api.assignPackage({
      dependencies: {
        'vue': '3.0.4',
        'vue-router': '4.0.0',
        'vuex': ''
      },
      devDependencies: {
        'vue-template-compiler': '3.0.4',
        'vue-loader': '16.1.1'
      }
    })

    try {
      const VueLoaderPlguin = require('vue-loader/lib/index')
      VueWebpackConfig.plugins.push(
        new VueLoaderPlguin.VueLoaderPlugin()
      )
    } catch (err) {}
  }

  return VueWebpackConfig
}
