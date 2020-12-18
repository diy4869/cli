/*
 * @Author: last order
 * @Date: 2020-06-04 13:50:43
 * @LastEditTime: 2020-12-18 11:43:42
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        // useBuiltIns: 'usage',
        // corejs: 3
      }
    ]
  ],
  plugins: [
    // '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-optional-chaining'
  ]
}
