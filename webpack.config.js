const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    //plugins: [ new BundleAnalyzerPlugin() ],
    //mode: 'development',
    mode: 'production',
    entry: {
        multipleDAuth: './src/multipleDAuthFakeTest.js',
        singleDAuth: './src/singleDAuthFakeTest.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'test.[name].js',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
        ]
    },
    stats: {
        colors: true
    },
    target: "web",
    externals: /k6(\/.*)?/,
    devtool: 'source-map',
    optimization: {
        usedExports: true,
    },
}
