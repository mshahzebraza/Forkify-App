const path = require('path'); 

var DIST_DIR = path.resolve(__dirname,'dist');
var SRC_DIR = path.resolve(__dirname,'src');

// module.export = {
module.exports = {
    entry: SRC_DIR+'/js/index.js',
    // entry: './src/js/index.js',
    output: {
        path: DIST_DIR+'/js',
        // path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    mode: 'development'
};