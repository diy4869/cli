import generatorOptions from './config/index'
import path = require('path')
import { API } from '@lo_cli/core/src/types'
import webpack = require('webpack')

export default async function VueTemplate (api: API): Promise<webpack.Configuration> {
  const options = await generatorOptions()
  console.log(options)
  const template = {
    index: {
      template: path.resolve(__dirname, 'template/src/index.js'),
      render () {
        return api.render(this.template, options)
      }
    },
    template: {
      template: path.resolve(__dirname, 'template/src/App.vue'),
      render () {
        return api.render(this.template, options)
      }
    },
    store: {
      template: path.resolve(__dirname, 'template/src/store/index.js'),
      render () {
        return api.render(this.template, options)
      }
    },
    router: {
      template: path.resolve(__dirname, 'template/src/router/index.js'),
      render () {
        return api.render(this.template, options)
      }
    }
  }
  // Object.keys(template).map(item => {
  //   console.log(template[item].template)
  //   template[item].render()
  // })

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
    const VueLoaderPlguin = require('vue-loader/dist/plugin').default
    VueWebpackConfig.plugins.push(
      new VueLoaderPlguin()
    )
  } else {
    const VueLoaderPlguin = require('vue-loader/lib/index')
    VueWebpackConfig.plugins.push(
      new VueLoaderPlguin.VueLoaderPlugin()
    )
  }
  return VueWebpackConfig
}
