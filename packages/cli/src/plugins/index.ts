/*
 * @Author: last order
 * @Date: 2020-06-15 11:50:18
 * @LastEditTime: 2020-06-15 14:18:16
 */
export default class Plugins {
  plugins: []

  constructor () {
    this.plugins = []
  }

  hasPlugin (): void {
    console.log('hasPlugin')
  }

  configWebpack (): void {
    console.log('configWebpack')
  }
}
