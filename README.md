<!--
 * @Author: last order
 * @Date: 2020-06-12 16:00:45
 * @LastEditTime: 2020-12-22 10:29:14
-->
<!--
 * @Author: last order
 * @Date: 2020-05-29 19:11:29
 * @LastEditTime: 2020-12-22 09:52:57
-->
## cli （目前依然是个半成品）
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)


### 背景

当我们创建vue项目的时候，会去官网下vue-cli，react的话你会去下create-react-app、或者umi，但是这些其实都还好，然而哪天你不需要这个了，你要再去下其他的吗，也可能你压根不需要用vue、react，只是想用webpack去做个启动服务啥的，这时候你发现基本上没有这种东西，你需要自己去学webpack等一堆东西。

现在自从有了cli，可以轻松做到以上事情，cli是独立于框架的，框架对于cli就是一个可选项，你可以用也可以选择不用，完全精简，而且内部也提供了一套api，用于自定义你自己的模板，你也可以选择根据现有的模板进行定制。

### 安装
```
npm install @lo_cli/core -g
```
### debug
如果你需要debug，你需要执行npm run install或者lerna bootstrap, 当你想本地调试的时候，需要``` cd packages/cli```，并```npm link```, npm会帮你全局注册个命令，然后你就可以愉快的debug了。

### 基本使用

创建一个项目 （这时候只会创建一个HTML css js的项目，当然也提供了ts做为可选项）

```
cli create project // 创建一个项目
```

创建一个vue项目（暂时并没实现）

```
cli create project --vue // 创建一个项目
```
创建一个react项目（暂时并没实现）

```
cli create project --react // 创建一个项目
```


### cli-service
当你安装cli的时候，cli会给你注册个cli-service命令，用来启动服务，如果用过vue-cli or umi，那你将会对这个比较熟悉。

当你不传--mode的时候，开发环境默认为development, 生产环境默认为production，这里还提供了test、gray2种环境

- development 开发环境
- test 测试环境
- gray 预发布环境（这种情况，公司项目会比较常见，我们一般为了模拟线上环境，所以会考虑线上数据备份，减少风险，这时候我们就有了预发布环境也可以称为灰度）
- production 生产环境

#### 一些基本命令
```
$ cli-service
Usage: service [options] [command]

Options:
  -V, --version    查看当前版本
  -h, --help       查看帮助
  --mode [type]    构建环境 development production test gray 共4种
  --report         开启日志分析 (default: false)

Commands:
  dev [args...]    启动服务
  build [args...]  开始打包
  help             查看帮助
```

// 启动服务

```
cli-service dev
```

// 打包项目
```
cli-service build
```
