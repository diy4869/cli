/*
 * @Author: last order
 * @Date: 2020-06-04 13:50:43
 * @LastEditTime: 2020-12-16 13:47:30
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        corejs: 3
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-optional-chaining'
  ]
}
