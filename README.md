# webpack 指南过程

## 管理资源

除了引入 JavaScript，webpack 还可以通过 loader 或内置的 <a href="https://webpack.docschina.org/guides/asset-modules/">Asset Modules </a>引入任何其他类型的文件

## 管理输出

使用 <a href="https://webpack.docschina.org/plugins/html-webpack-plugin/">html-webpack-plugin</a> 可以动态生成 html 文件并引入打包后的文件， 我们不再需要在 dist 里的 index.html 手动引入

## 开发环境

- 为了更容易地追踪 error 和 warning，JavaScript 提供了 <a href="https://blog.teamtreehouse.com/introduction-source-maps">source maps</a> 功能，可以将编译后的代码映射回原始源代码

开发环境

- 使用 [watch mode(观察模式)](https://webpack.docschina.org/guides/development/#using-watch-mode)
  `webpack --watch`
  缺点： 每次都需要刷新浏览器
- 使用 [ webpack-dev-server](https://webpack.docschina.org/guides/development/#using-webpack-dev-server)
  > Tip :
  > webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问
- 使用 [webpack-dev-middleware](https://webpack.docschina.org/guides/development/#using-webpack-dev-middleware)（暂时只涉及上面两种）
