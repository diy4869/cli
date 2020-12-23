/*
 * @Author: last order
 * @Date: 2020-05-29 18:46:43
 * @LastEditTime: 2020-12-22 15:13:23
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
  rules: {
    'array-callback-return': 0
  }
}
