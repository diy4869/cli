/*
 * @Author: last order
 * @Date: 2020-12-14 16:43:51
 * @LastEditTime: 2020-12-23 11:35:12
 */
import generatorOptions from './src/config/index'
import { API, Options, ReturnTypes } from '@lo_cli/core/src/types'
import { outputFiles } from '@lo_cli/utils/index'
import webpack = require('webpack')
import path = require('path')

export default async function VueTemplate (api: API, options: Options): Promise<ReturnTypes> {
  const promptOption = await api.prompt(generatorOptions)

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
  let packageJson = {}
  if (promptOption.useVue3) {
    packageJson = api.assignPackage({
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
      const VueLoaderPlguin = require('vue-loader/dist/plugin').default

      VueWebpackConfig.plugins.push(
        new VueLoaderPlguin()
      )
    } catch (err) {
      console.log(err)
    }
  } else {
    packageJson = api.assignPackage({
      dependencies: {
        'vue': '2.6.12',
        'vue-router': '3.4.9',
        'vuex': '3.6.0'
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

  api.configWebpack(() => {
    return VueWebpackConfig
  })
  const templatePath = path.resolve(__dirname, './src/template/vue2')

  const template = await outputFiles(templatePath)

  return {
    generatorFiles: template,
    config: VueWebpackConfig
  }
}
