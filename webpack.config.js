const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, 'docs')
    },
    optimization: {
        minimize: false
    },
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        port: 9000
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader'
            })
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            alwaysWriteToDisk: true
        }),
        new ExtractTextPlugin('styles.css')
    ]
};
