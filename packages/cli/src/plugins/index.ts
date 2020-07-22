/*
 * @Author: last order
 * @Date: 2020-06-15 11:50:18
 * @LastEditTime: 2020-07-21 11:15:02
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
