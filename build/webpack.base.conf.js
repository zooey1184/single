'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const glob = require('glob')
var entries = getEntry('./src/pages/*/*.js')
const fs = require("fs");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const argv = process.argv
// 判断是否默认行为， 默认行为：全部页面访问
let s = 'index'
let page = 'hualu'
if(argv.length>2) {
  s = argv[2]
}
if(argv.length>3) {
  s = argv[3]
  page = argv[2]
}
function fileDisplay(filePath) {
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err)
    } else {
      console.log(files);
    }
  })
}
var FilePath = path.resolve(__dirname, '../src/pages');
console.log(FilePath);
fileDisplay(FilePath)

// 创建入口文件
let obj = {}
obj[`${s}`] = `./src/pages/${page}/${s}/${s}.js`
<<<<<<< HEAD
let babel = {
  "babel-polyfill":"babel-polyfill",
}
Object.assign(obj, babel)

=======
let a = {
  "babel-polyfill":"babel-polyfill",
}
Object.assign(obj, a)
<<<<<<< HEAD
console.log('\n\n\n\n============');
console.log('\n\n\n');
console.log(JSON.stringify(obj));
console.log('\n\n\n\n============');
=======
>>>>>>> 21e80ee1cd01741845a305309e1add7d9ce8d36f
>>>>>>> b145670e14f61f43b345d4e8fb26864951bc2237
module.exports = {
  // entry: (argv.length>2)? obj : entries,
  entry: {
    app: ['babel-polyfill', './src/pages/hualu/index/index.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024*500,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
      },
    ]
  }
}

//获取入口js文件
function getEntry(globPath) {
  var entries = {}, basename, tmp, pathname;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    pathname = basename.split("_")[0];
    entries[pathname] = entry;
  });
  return entries;
}
