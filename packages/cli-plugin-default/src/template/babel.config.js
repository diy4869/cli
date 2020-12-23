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
