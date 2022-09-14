const glob = require('glob');
const webpack = require('webpack');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const {isDev, requestToExternal, requestToHandle} = require("./bin/webpack-helpers");
const path = require("path");
const RemoveFilePlugin = require("./bin/remove-file-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');

const defaultConfig = {
    watch: isDev(),
    watchOptions: {
        ignored: /node_modules/,
        poll: 5000 //5 secs
    },
    devtool: 'source-map'
}

const jsBlocksConfig = {
    ...defaultConfig, ...{
        entry: {
            'wc-stripe-plaid': './packages/blocks/assets/js/payment-methods/plaid',
        },
        output: {
            path: path.resolve(__dirname, 'packages/blocks/build'),
            filename: '[name].js',
        },
        optimization: {
            splitChunks: {
                automaticNameDelimiter: '--',
                minSize: 0,
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false,
                                    targets: {
                                        browsers: [
                                            'extends @wordpress/browserslist-config'
                                        ]
                                    }
                                }
                            ]
                        ],
                        plugins: [
                            require.resolve('@babel/plugin-proposal-object-rest-spread'),
                            require.resolve('@babel/plugin-transform-react-jsx'),
                            require.resolve('@babel/plugin-proposal-async-generator-functions'),
                            require.resolve('@babel/plugin-transform-runtime'),
                            require.resolve('@babel/plugin-proposal-class-properties'),
                            !isDev() ? require.resolve('babel-plugin-transform-react-remove-prop-types') : false
                        ].filter(Boolean)
                    }
                }
            }, {
                test: /\.s?css$/,
                use: {
                    loader: 'ignore-loader',
                }
            }]
        },
        plugins: [
            new DependencyExtractionWebpackPlugin({
                injectPolyfill: true,
                requestToExternal: requestToExternal,
                requestToHandle: requestToHandle
            }),
            new webpack.ProvidePlugin({
                'React': '@wordpress/element'
            })
        ]
    }
};


const styleBlocksConfig = {
    ...defaultConfig, ...{
        entry: {
            style: glob.sync('./packages/blocks/assets/**/*.{css,scss}'),
        },
        output: {
            path: path.resolve(__dirname, 'packages/blocks/build')
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: (pathData) => {
                    return '[name].css';
                }
            }),
            new WebpackRTLPlugin({
                filename: '[name]-rtl.css',
                minify: {
                    safe: true
                }
            }),
            new RemoveFilePlugin('./packages/blocks/build/*style.js'),
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin()
            ]
        },
    }
}

module.exports = [jsBlocksConfig, styleBlocksConfig];