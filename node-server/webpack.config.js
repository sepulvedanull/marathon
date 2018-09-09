import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import LiveReloadPlugin from 'webpack-livereload-plugin'

export default {
  entry: './client/app.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
}
/*
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve('./client/runner-performances.js'),
  devtool: 'inline-source-map',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './client/dist')
  },
  devServer: {
    contentBase: './'
  }
}
*/
