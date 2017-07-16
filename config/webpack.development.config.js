const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, '../public/static/build/')
const APP_DIR = path.resolve(__dirname, '../src/')
const STATIC_PATH = path.resolve(__dirname, '../public/static/')

var themeFiles = []
var includeDirs = [STATIC_PATH + '/css']
includeDirs.forEach(function (dir) {
  themeFiles = themeFiles.concat(readDirR(dir))
})

function readDirR (dir) {
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(fs.readdirSync(dir).map(f => readDirR(path.join(dir, f))))
    : dir
}
module.exports = {
  context: APP_DIR,
  devtool: 'cheap-module-source-map',
  entry: {
    'bundle.js': ['./App.js'],
    'style.css': themeFiles
  },
  output: {
    filename: '[name]',
    path: BUILD_DIR,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]'),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: { inline: false }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: false,
      sourceMap: false,
      compressor: {
        warnings: false
      },
      comments: false,
      minimize: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  externals: {
    'config': JSON.stringify(require(path.resolve(__dirname, 'config.json')))
  }
}
