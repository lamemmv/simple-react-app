/*
    ./webpack.config.js
*/

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

const analyze = !!process.env.ANALYZE_ENV;
const env = process.env.NODE_ENV || 'development';

const webpackConfig = {
    name: 'client',
    target: 'web',

    entry: {
        app: path.resolve('src/index.js'),
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            },
        }),
        HtmlWebpackPluginConfig,
    ],

    output: {
        filename: '[name].js',
        path: path.resolve('src/dist'),
        publicPath: '/',
    },

    resolve: {
        modules: [
            path.resolve('src'),
            'node_modules',
        ],
        extensions: ['.js', '.jsx'],
    },
}

if (analyze) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (env === 'production') {
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
        })
    )
}

module.exports = webpackConfig;

/*const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
}*/