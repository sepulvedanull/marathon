const path = require('path');

module.exports = {
    entry: './public/runner-performances.js',
	devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/dist')
    },
    devServer: {
        contentBase: './'
    }
}
