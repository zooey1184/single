'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const Manifest= require('webpack-html-manifest-plugin')

var glob = require('glob')

const env = config.build.env



const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    // filename: utils.assetsPath('[name]/js/[name].[chunkhash].js'),
    // chunkFilename: utils.assetsPath('[name]/js/[id].[chunkhash].js')
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // filename: utils.assetsPath('[name]/css/[name].[contenthash].css')
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // 复制static的文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    // ************************预打包处理**********************************
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./vendor-manifest.json')
    // }),
    // *********************************************************************


    // 添加缓存机制
    // new Manifest({
    //   cache: [
    //     // 'index.html'
    //   ],
    //   cacheWithoutReg: '&',
    //   cacheLinkReg: config.build.manifestCacheLinkReg,
    //   //Add time in comments.
    //   timestamp: true,
    //   // 生成的文件名字，选填
    //   // The generated file name, optional.
    //   filename:'cache.manifest',
    //   // 注意*星号前面用空格隔开
    //   network: config.build.manifestNetwork || [
    //     '*'
    //   ],
    //   // 注意中间用空格隔开
    //   // fallback: ['/ /404.html'],
    //   master: ['index.html']
    // })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

function getEntry(globPath) {
  var entries = {}, basename;

  glob.sync(globPath).forEach(function(entry) {

    basename = path.basename(entry, path.extname(entry));
    entries[basename] = entry;
  });
  console.log(entries);
  return entries;
}

// 创建html模板
let entryPage = 'src/pages/hualu/**/*.html'
const argv = process.argv
if(argv.length>2) {
  entryPage = `src/pages/hualu/${argv[2]}/index.html`
}
if(argv.length>3) {
  entryPage = `src/pages/${argv[2]}/${argv[3]}/index.html`
}
var pages = getEntry(entryPage);

// for (var pathname in pages) {
//   var conf = {
//     filename: config.build[pathname].replace(/\.html$/, '.php'),
//     template: pages[pathname],
//     inject: true,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true
//     },
//     // chunks: ["manifest", "vendor", pathname]
//     chunks: [pathname]
//   }
//   console.log("hhh",`dasd:${conf.filename}`);
//   module.exports.plugins.push(new HtmlWebpackPlugin(conf));
// }
for (var pathname in pages) {
  console.log(config.build[pathname]);
  console.log(pathname, pages);
  var conf = {
    filename: 'index.html',
    template: pages[pathname],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks: ["manifest", "vendor", pathname]
    // chunks: [pathname]
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
