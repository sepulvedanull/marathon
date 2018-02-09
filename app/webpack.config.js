module.exports = {
    entry: './app.js',
	devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './'
    }
}
