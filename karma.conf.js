module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        files: [
            'tests/client/run.js'
        ],

        preprocessors: {
            'tests/client/run.js': ['webpack']
        },
        reporters: [
            'spec'
        ],
        singleRun: true,
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.(js)?$/,
                        include: /tests\/client/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader'
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        },
        specReporter: {
            suppressPassed: true
        }
    });
};
