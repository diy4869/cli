/*
 * @Author: last order
 * @Date: 2020-06-02 10:02:02
 * @LastEditTime: 2020-06-07 11:45:41
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
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  }
}
