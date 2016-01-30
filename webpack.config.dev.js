const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/client/index.jsx',
    output: {
        path: path.resolve(__dirname, '/public'),
        publicPath: '/',
        filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?' +
                    'modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/app.css')
    ]
};
