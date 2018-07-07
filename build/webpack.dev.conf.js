'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var glob = require('glob')
var path = require('path')
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var EXPORT = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
  ]
})


// 创建html模板
let entryPage = 'src/pages/hualu/index/index.html'
const argv = process.argv
if(argv.length>2) {
  entryPage = `src/pages/hualu/${argv[2]}/index.html`
}
if(argv.length>3) {
  entryPage = `src/pages/${argv[2]}/${argv[3]}/index.html`
}
var conf ={
  filename: 'index.html',
  template: entryPage,
  inject: true, // js插入位置
  chunks: 'index'
}
EXPORT.plugins.push(new HtmlWebpackPlugin(conf));

module.exports = EXPORT
