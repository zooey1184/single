'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // if(process.argv.length<5) {
  //   console.log(chalk.red('  Build failed with errors.\n'))
  //   return
  // }
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  hualu 如果其他项目，请在打包前加项目名，资源在:\n' +
      '  hualu: r.51gjj.com/resource/loan/hualu/xx\n' +
      '  other: r.51gjj.com/resource/loan/xx/xxx\n' +
      '  打包后复制一份文件到release作为版本控制'
    ))
  })
})
