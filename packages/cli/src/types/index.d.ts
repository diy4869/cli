import webpack = require('webpack')

export interface API {
  config: webpack.Configuration,
  render<T>(path: string, options: T): string
}

export interface PluginOptions {
  name: string,
  apply: (api: API) => Promise<webpack.Configuration>
}
