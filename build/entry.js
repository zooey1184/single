const glob = require('glob')
const path = require('path')
const argv = process.argv

//获取入口js文件
exports.getEntry = function(globPath) {
  var entries = {}, basename, tmp, pathname;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    pathname = basename.split("_")[0];
    entries[pathname] = entry;
  });
  return entries;
}

// 创建入口文件
exports.entryJs = function() {
  function getEntrys(globPath) {
    var entries = {}, basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
      basename = path.basename(entry, path.extname(entry));
      pathname = basename.split("_")[0];
      entries[pathname] = entry;
    });
    return entries;
  }
  let entries = getEntrys('./src/page/*/*.js')
  // 判断是否默认行为， 默认行为：全部页面访问
  let s = 'index'
  let page = 'hualu'
  let obj = {}
  if(argv.length>2) {
    s =
    obj[`${s}`] = `./src/page/${page}/${argv[2]}.js`
  }
  if(argv.length>3) {
    page = argv[2]
    s = argv[3]
    obj[`${s}`] = `./src/page/${page}/${s}.js`
  }
  return obj
}



// 创建html模板
exports.pagesHtml = function() {
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
  return pages
}
