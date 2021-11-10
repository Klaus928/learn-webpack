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

- 一、使用 import() 动态语法进行导入
- 二、使用 require.ensure

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
