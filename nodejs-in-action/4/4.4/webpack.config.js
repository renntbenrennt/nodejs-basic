const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/index.jsx',
    output: { 
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.js',
        publicPath: '/assets/' 
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}