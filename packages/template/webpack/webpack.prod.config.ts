/*
 * @Author: last order
 * @Date: 2020-06-06 13:12:51
 * @LastEditTime: 2020-06-08 17:24:42
 */
import baseConfig from './webpack.base.config'
import webpack = require('webpack')
import merge = require('webpack-merge')

const config: webpack.Configuration = {

}

export default merge(baseConfig, config)
