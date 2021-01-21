import { API, ReturnTypes } from '@lo_cli/core/src/types'
import generatorOptions from './src/config/index'
import { outputFiles } from '@lo_cli/utils/index'
import path = require('path')
import MiniCssExtractPlugin = require('mini-css-extract-plugin')

export default async function reactTemplate(api: API, options): Promise<ReturnTypes> {
  const { useCssModule } = await api.prompt(generatorOptions)
  const { useTypescript } = options.generatorOptions


  api.assignPackage({
    dependencies: {
      'react': '17.0.1',
      'react-dom': '17.0.1',
      'react-router-dom': '5.2.0'
    }
  })
  api.configWebpack(config => {
    return {
      resolve: {
        extensions: useTypescript ? ['.tsx'] : ['.jsx']
      }
    }
  })
  if (useTypescript) {
    api.assignPackage({
      devDependencies: {
        '@types/react': '17.0.1',
        '@types/react-dom': '17.0.1'
      }
    })
  }
  if (useCssModule) {
    api.configWebpack(config => {
      return {
        module: {
          rules: [
            {
              test: /\.(sass|scss)$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    esModule: true,
                    modules: {
                      localIdentName: '[local]--[hash:5]',
                      context: path.resolve(__dirname, 'src')
                    }
                  }
                },
                'postcss-loader',
                'sass-loader'
              ]
            }
          ]
        }
      }
    })
  }
  const templatePath = path.resolve(__dirname, './src/template')
  const template = await outputFiles(templatePath)

  // console.log(template)

  // return
  return {
    generatorFiles: template
  }
}
