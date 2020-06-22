/*
 * @Author: last order
 * @Date: 2020-06-01 16:52:41
 * @LastEditTime: 2020-06-19 17:36:39
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

type ENV_TYPE = 'development' | 'production'

export default (ENV?: ENV_TYPE): webpack.Configuration => {
  const config: webpack.Configuration = {
    mode: ENV,
    entry: userWebpackConfig().pages ? multiPage.entry() : {
      index: [
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../src/index.ts')
      ]
    },
    output: {
      path: path.join(__dirname, '../dist'),
      filename: '[name].[hash:8].js'
    },
    module: {
      rules: [
        // {
        //   test: /\.html$/,
        //   use: 'html-loader'
        // },
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
      enforceExtension: false,
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.join(__dirname, '../src')
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
      new HtmlWebpackPlugin({
        // title: 'hello world',
        filename: 'index.html',
        inject: true,
        template: path.join(__dirname, '../src/page/index.html')
      }),
      new CleanWebpackPlugin()
    ]
  }

  // if (!userWebpackConfig()?.pages) {
  //   config.plugins = [
  //     ...config.plugins,
  //     new HtmlWebpackPlugin({
  //       title: 'hello world',
  //       filename: 'index.html',
  //       inject: true,
  //       template: path.join(__dirname, '../src/page/index.html')
  //     })
  //   ]
  // } else {
  //   config.plugins = [
  //     ...config.plugins,
  //     ...multiPage.page()
  //   ]
  // }

  return config
}
