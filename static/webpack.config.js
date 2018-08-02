const path = require('path');

module.exports = {
    entry: './runner-performances.js',
	devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './'
    }
}
