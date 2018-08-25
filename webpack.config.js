const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve('./public/runner-performances.js'),
  devtool: 'inline-source-map',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './public/dist')
  },
  devServer: {
    contentBase: './'
  }
}
