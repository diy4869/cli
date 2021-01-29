/*
 * @Author: last order
 * @Date: 2020-06-01 16:52:41
 * @LastEditTime: 2020-12-18 11:03:28
 */
import getProjectConfig from './utils/getProjectConfig'
import multiPage from './utils/index'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import path = require('path')
import webpack = require('webpack')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import MiniCssExtractPlugin = require('mini-css-extract-plugin')
import TerserPlugin = require('terser-webpack-plugin')

type WEBPACK_ENV = 'development' | 'production'

const baseDir = process.cwd()

export default (ENV = 'development'): webpack.Configuration => {
  const userWebpackConfig = getProjectConfig()
  const config: webpack.Configuration = {
    context: baseDir,
    mode: ENV as WEBPACK_ENV,
    entry: userWebpackConfig?.pages ? multiPage.entry() : path.resolve('./src/index.js'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[contentHash:8].js',
      publicPath: userWebpackConfig?.publicPath || ''
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(jpg|jpeg|webp|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                quality: 80,
                name: '[name].[hash:8].[ext]',
                outputPath: 'assets/img'
              }
            }
          ]
        },
        {
          test: /\.(mp4|ogg|webm|m3u8|mpd)$/,
          use: ['file-loader']
        },
        {
          test: /\.(mp3|aac|ac3|flac|wav)$/,
          loader: 'file-loader'
        },
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'eslint-loader',
              // options: {
              //   emitError: true,
              //   failOnError: true
              // }
            },
            'babel-loader'
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'eslint-loader',
              // options: {
              //   emitError: true,
              //   failOnError: true
              // }
            },
            'ts-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.resolve(baseDir, './src'),
        '~': path.resolve(baseDir, './src/assets')
      }
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: ENV === 'production',
              drop_debugger: true
            }
          }
        })
      ]
    },
    devtool: ENV === 'development' ? 'source-map' : 'hidden-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV)
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contentHash:8].css'
      }),
      new CleanWebpackPlugin()
    ]
  }

  if (!userWebpackConfig?.pages) {
    config.plugins = [
      ...config.plugins,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.resolve(baseDir, './src/page/index.html')
      })
    ]
  } else {
    config.plugins = [
      ...config.plugins,
      ...multiPage.page()
    ]
  }

  return config
}
