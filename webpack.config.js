const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname,'dist');
var SRC_DIR = path.resolve(__dirname,'src');

// module.export = {
module.exports = {
    entry: SRC_DIR+'/js/index.js',
    // entry: './src/js/index.js',
    output: {
        path: DIST_DIR,
        // path: path.resolve(__dirname, 'dist/js'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // Options here... Options are passed in form of arrays as a standard in JS
            filename: 'index.html',
            template: SRC_DIR + '/index.html'
        })
    ]
};