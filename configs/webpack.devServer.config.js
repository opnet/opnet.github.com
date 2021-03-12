const { merge } = require('webpack-merge')
const path = require('path')

module.exports = merge(require('./webpack.dev.config'), {
  devServer: {
    contentBase: path.resolve(__dirname, '..'),
    host: '0.0.0.0',
    hot: true,
    compress: true,
    port: 9000,
  }
})
