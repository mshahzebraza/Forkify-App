const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname,'dist');
var SRC_DIR = path.resolve(__dirname,'src');

// module.export = {
module.exports = {
    // entry: ['@babel/polyfill', SRC_DIR+'/js/index.js'], // solved the Error : Cannot find module '@babel/core'
    entry: ['babel-polyfill', SRC_DIR+'/js/index.js'],
    // entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: DIST_DIR,
        // path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: SRC_DIR + '/index.html'
            // template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devtool: 'eval-source-map'
};
