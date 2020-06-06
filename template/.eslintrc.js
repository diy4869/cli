/*
 * @Author: last order
 * @Date: 2020-06-02 10:02:02
 * @LastEditTime: 2020-06-06 14:27:03
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  }
}
