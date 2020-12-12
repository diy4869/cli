/*
 * @Author: last order
 * @Date: 2020-06-01 16:52:41
 * @LastEditTime: 2020-07-30 14:15:17
 */
import getProjectConfig from './utils/getProjectConfig'
import multiPage from './utils/index'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import path = require('path')
import webpack = require('webpack')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import MiniCssExtractPlugin = require('mini-css-extract-plugin')
import TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlguin = require('vue-loader/dist/plugin').default
const userWebpackConfig = () => getProjectConfig()

type NODE_ENV = 'development' | 'production'

export default (ENV?: NODE_ENV): webpack.Configuration => {
  const config: webpack.Configuration = {
    mode: ENV || 'development',
    entry: userWebpackConfig().pages ? multiPage.entry() : '../src/index.ts',
    output: {
      path: path.join(__dirname, '../dist'),
      filename: '[name].[hash:8].js'
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
          test: /\.(sass|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
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
              options: {
                emitError: true,
                failOnError: true
              }
            },
            'babel-loader'
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                emitError: true,
                failOnError: true
              }
            },
            'ts-loader'
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.vue'],
      alias: {
        '@': path.join(__dirname, '../src'),
        '~': path.join(__dirname, '../src/assets')
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
      new VueLoaderPlguin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV)
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contentHash:8].css'
      }),
      new CleanWebpackPlugin()
    ]
  }

  if (!userWebpackConfig()?.pages) {
    config.plugins = [
      ...config.plugins,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.join(__dirname, '../src/page/index.html')
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
