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
- 使用 [ webpack-dev-server](https://webpack.docschina.org/guides/development/#using-webpack-dev-server) , 在内存中编译，而非写入磁盘
  > Tip :
  > webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 `http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]` 进行访问
- 使用 [webpack-dev-middleware](https://webpack.docschina.org/guides/development/#using-webpack-dev-middleware)（暂时只涉及上面两种）

## 代码分离

代码分离是 webpack 中最引人注目的特性之一。<p style="color: #329a59;font-size: 14px;">此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间</p>

### 一、 入口起点

```javascript
 entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
```

隐患：

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

解决：

```javascript
  entry: {
    // index: './src/index.js',
    // another: './src/another-module.js'
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  optimization: {
    runtimeChunk: 'single',
  },
```

重新打包后构建结果如下，

![](https://img-blog.csdnimg.cn/e1df98f93bfd4b3e81180b03cfefbbd2.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6ZOB5p-xZWY=,size_20,color_FFFFFF,t_70,g_se,x_16)
可以看到除了生成 shared.bundle.js，index.bundle.js 和 another.bundle.js 之外，还生成了一个 runtime.bundle.js 文件

使用 [SplitChunksPlugin](https://webpack.docschina.org/guides/code-splitting/#splitchunksplugin)
作用： 可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk

```javascript
  optimization: {
     splitChunks: {
       chunks: 'all',
     },
   },
```

以下是重新构建的结果：

![](https://img-blog.csdnimg.cn/81135fc675f3401e8f9c966887bbd43e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6ZOB5p-xZWY=,size_20,color_FFFFFF,t_70,g_se,x_16)
可以看到共同的模块被分离到 shared.bundle.js 里，index.bundle.js 和 another.bundle.js 体积更小了

### 二、动态导入

- 使用 import() 动态语法进行导入
- 使用 require.ensure

只使用第一种

```javascript
async function getComponent() {
  const element = document.createElement('div')
  const { default: _ } = await import('lodash')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  return element
}
getComponent().then((component) => {
  document.body.appendChild(component)
})
```

构建结果如下：

![](https://img-blog.csdnimg.cn/f96caba5cf08422fbba2190fc3db90fd.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6ZOB5p-xZWY=,size_20,color_FFFFFF,t_70,g_se,x_16)

## 缓存

> 此指南重点在于通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件

### 提取引导模板

将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。
在代码分离我们学到，[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)可以用于将模块分离到单独的 bundle 中。webpack 还提供了一个优化功能，可使用 [optimization.runtimeChunk](https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk) 选项将 runtime 代码拆分为一个单独的 chunk.

```javascript
   optimization: {
      runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
       },
     },
    },
```

构建结果如下：

![](https://img-blog.csdnimg.cn/cb06962e01b1456eb7b397d6baa396de.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6ZOB5p-xZWY=,size_20,color_FFFFFF,t_70,g_se,x_16)

可以看到打包出来的文件体积减小了许多

## 环境变量

`npx webpack --env goal=local --env production --progress`

webpack.config.js 中 module.exports 转换为函数可以通过 env 访问到提供的环境变量

## 构建性能

### 开发环境

- 增量编译
- 在内存中编译
- Devtool,最佳选择是 eval-cheap-module-source-map
- 避免在生产环境下才会用到的工具
- 最小化 entry chunk，开启 `runtimeChunk: true`，优化 optimization 配置
- 输出结果不携带路径信息
  ```javascript
  output: {
    pathinfo: false,
  },
  ```
  - ts-loader 传入`transpileOnly: true` 选项，以缩短使用 ts-loader 时的构建时间，使用此选项会关闭类型检查

### 生产环境

关闭 source Map， 避免消耗资源

### 工具相关问题

Babel

- 最小化项目中的 preset/plugin 数量。

TypeScript

- 在单独的进程中使用 fork-ts-checker-webpack-plugin 进行类型检查。
- 配置 loader 跳过类型检查。
- 使用 ts-loader 时，设置 happyPackMode: true / transpileOnly: true。

Sass

- node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2。
