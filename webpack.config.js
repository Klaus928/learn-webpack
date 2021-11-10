const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  const mode = env.mode
  const common = {
    mode,
    entry: {
      index: './src/index.js',
    },
    output: {
      filename: '[name].[contenthash].js',
      path: resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      moduleIds: 'deterministic',
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
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Cache',
      }),
    ],
  }
  if (mode === 'development') {
    return {
      devtool: 'inline-source-map',
      devServer: {
        static: './dist',
      },
      ...common,
    }
  } else {
    return {
      ...common,
    }
  }
}
