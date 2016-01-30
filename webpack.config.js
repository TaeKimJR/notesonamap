const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',

    output: { path: __dirname, filename: 'public/bundle.js' },

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
        new ExtractTextPlugin('public/css/app.css')
    ]
};
