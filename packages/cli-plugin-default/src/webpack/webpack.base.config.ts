/*
 * @Author: last order
 * @Date: 2020-06-01 16:52:41
 * @LastEditTime: 2020-12-17 16:57:30
 */
import getProjectConfig from './utils/getProjectConfig'
import multiPage from './utils/index'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import path = require('path')
import webpack = require('webpack')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import MiniCssExtractPlugin = require('mini-css-extract-plugin')
import TerserPlugin = require('terser-webpack-plugin')
const userWebpackConfig = () => getProjectConfig()

type WEBPACK_ENV = 'development' | 'production'


export default (ENV?: WEBPACK_ENV): webpack.Configuration => {
  const config: webpack.Configuration = {
    mode: ENV || 'development',
    entry: userWebpackConfig().pages ? multiPage.entry() : path.resolve(process.cwd(), './src/index.ts'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[fullhash:8].js'
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
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.resolve(__dirname, '../src'),
        '~': path.resolve(__dirname, '../src/assets')
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

  if (!userWebpackConfig()?.pages) {
    config.plugins = [
      ...config.plugins,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.resolve(__dirname, '../template/src/page/index.html')
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
