/*
 * @Author: last order
 * @Date: 2020-06-01 16:52:41
 * @LastEditTime: 2020-06-07 11:42:04
 */
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import path = require('path')
import webpack = require('webpack')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config: webpack.Configuration = {
  mode: 'development',
  entry: path.join(__dirname, '../src/index.ts'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
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
        test: /\.js$/,
        use: [
          'eslint-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          'eslint-loader',
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
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: 'localhost',
    port: 8000,
    hot: true,
    compress: true,
    noInfo: true,
    quiet: true,
    overlay: {
      warnings: true,
      errors: false
    },
    clientLogLevel: 'none'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello world',
      filename: 'index.html',
      inject: true,
      template: path.join(__dirname, '../src/page/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contentHash:8].css'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
export default config
