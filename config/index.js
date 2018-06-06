
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
var glob = require('glob')
//根据getEntry获取所有入口主页面
// 创建html模板
let entryPage = 'src/pages/**/*.html'
let assets_PublicPath = 'hualu'
let assetsZoon = 'index'
const argv = process.argv
if(argv.length>2) {
  entryPage = `src/pages/hualu/${argv[2]}/${argv[2]}.html`
  assets_PublicPath = 'hualu'
  assetsZoon = argv[2]
}
if(argv.length>3) {
  entryPage = `src/pages/${argv[2]}/${argv[3]}/${argv[3]}.html`
  assets_PublicPath = argv[2]
  assetsZoon = argv[3]
}
var pages = getEntry(entryPage);
var build = {
  env: require('./prod.env'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: "",
  // assetsPublicPath: `${window.location.host}/act/home/huodong/`,
  assetsPublicPath: `https://r.51gjj.com/resource/loan/${assets_PublicPath}/${assetsZoon}`,
  productionSourceMap: false,
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,
  manifestCacheLinkReg: /(\/\/r\.51gjj\.com|\/\/at\.alicdn\.com)/,
  manifestNetwork: [
    '*'
  ],
}

//每个入口页面生成一个入口添加到build中
for (var pathname in pages) {
  // build[pathname] = path.resolve(__dirname, '../dist/' + pathname + '/' + pathname + '.html')
  // build[pathname] = path.resolve(__dirname, '../dist/' + 'page' + '/' + pathname + '.html')
}
//获取所有入口文件
function getEntry(globPath) {
  var entries = {}, basename;

  glob.sync(globPath).forEach(function(entry) {

    basename = path.basename(entry, path.extname(entry));

    entries[basename] = entry;
  });
  return entries;
}

module.exports = {
  build: build,
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
