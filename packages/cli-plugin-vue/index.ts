import generatorOptions from './config/index'
import path = require('path')
import webpack = require('webpack')
import MiniCssExtractPlugin = require('mini-css-extract-plugin')

const preset = (css: string) => {
  const lang = {
    less: {
      package: {
        'less-loader': '',
        'less': ''
      }
    },
    scss: {
      package: {
        'sass-loader': '',
        'sass': ''
      }
    },
    stylus: {
      package: {
        'stylus-loader': '',
        'stylus': ''
      }
    }
  }

  return lang[css]['package']
}

export default async function (api) {
  const options = await generatorOptions()
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
  Object.keys(template).map(item => {
    console.log(template[item].template)
    template[item].render()
  })

  const VueWebpackConfig: webpack.Configuration = {
    module: {
      rules: [
        {
          test: new RegExp(`.${options.cssPreset}$`),
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            `${options.cssPreset}-loader`
          ]
        },
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
