import { ProjectConfig } from 'cli-plugin-default/src/webpack/project.config'

const config = new ProjectConfig({
  publicPath: '',
  devServer: {
    port: 8080,
    overlay: false
  },
  configWebpack (config) {
    return config
  }
})

export default config
