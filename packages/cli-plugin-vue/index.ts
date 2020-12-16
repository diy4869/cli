/*
 * @Author: last order
 * @Date: 2020-12-14 16:43:51
 * @LastEditTime: 2020-12-16 17:24:33
 */
import generatorOptions from './src/config/index'
import { API, ReturnTypes } from '@lo_cli/core/src/types'
import { outputFiles } from '@lo_cli/utils/index'
import webpack = require('webpack')
import path = require('path')

export default async function VueTemplate (api: API): Promise<ReturnTypes> {
  const options = await api.prompt(generatorOptions)
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

  if (options.useVue3) {
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
    console.log('vue3')
    try {
      const VueLoaderPlguin = require('vue-loader/dist/plugin').default
      VueWebpackConfig.plugins.push(
        new VueLoaderPlguin()
      )
    } catch (err) {
      console.log(err)
    }

  } else {
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
      const { VueLoaderPlugin } = require('vue-loader/lib/index')

      VueWebpackConfig.plugins.push(
        new VueLoaderPlugin()
      )
    } catch (err) {
      console.log(err)
    }
  }

  const templatePath = path.resolve(__dirname, './src/template/vue2')

  return {
    generatorFiles: await outputFiles(templatePath),
    config: VueWebpackConfig
  }
}
