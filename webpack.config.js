var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//webpack基础配置
var basicConfig = {
    entry: {
        app: "./src/main.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist")
    },
    resolve: {
        extensions: [".js", ".vue"]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: './img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                name: './fonts/[name].[hash:7].[ext]'
            }
        }]
    }
}

//webpack开发环境配置
var devConfig = {
    entry: {
        app: ["./src/main.js", "webpack-hot-middleware/client?noInfo=true&reload=true"]
    },
    output: {
        filename: "./[name].[hash].js",
        chunkFilename: path.join('./[id].[hash].js')
    },
    devtool: '#source-map',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                cssSourceMap: true
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    importLoaders: 1
                }
            }]
        }, {
            test: /\.less$/,
            use: [{
                loader: "vue-style-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "less-loader",
                options: {
                    sourceMap: true
                }
            }]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        //开发环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        })
    ]
}

//webpack生产环境配置
var buildConfig = {
    output: {
        filename: "./[name].[chunkhash].js",
        chunkFilename: path.join('./[id].[chunkhash].js')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                sourceMap: true,
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: ['css-loader', 'postcss-loader'],
                        fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                    }),
                    less: ExtractTextPlugin.extract({
                        use: ['css-loader', 'less-loader', 'postcss-loader'],
                        fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                    })
                }
            }
        }, {
            //配合ExtractTextPlugin使用
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: ['css-loader', 'postcss-loader'],
                fallback: 'style-loader'
            })
        }, {
            //配合ExtractTextPlugin使用
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader', 'postcss-loader'],
                fallback: 'style-loader'
            })
        }]
    },
    plugins: [
        //css单独出个文件
        new ExtractTextPlugin("./style.[contenthash].css"),
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        // 分js打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, './node_modules')
                    ) === 0
                )
            }
        }),

    ]
};

var config = {
    dev: devConfig,
    test: merge(buildConfig, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ]
    }),
    pro: merge(buildConfig, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
        ]
    }),
};

module.exports = merge(basicConfig, config[process.env.NODE_ENV]);
