var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

var othername = function(f) {
    var hash = JSON.parse(process.env.HASH) ? ".[hash:7]" : "";
    return `./${f}/[name]${hash}.[ext]`;
};
var filename = function() {
    var hash = JSON.parse(process.env.HASH) ? ".[hash]" : "";
    return `./[name]${hash}.js`;
};
var cssFilename = function() {
    var hash = JSON.parse(process.env.HASH) ? ".[contenthash]" : "";
    return `./style${hash}.css`;
};
var chunkFilename = function() {
    var hash = JSON.parse(process.env.HASH) ? ".[hash]" : "";
    return `./chunk/[id]${hash}.js`;
};

//webpack基础配置
var basicConfig = {
    entry: {
        app: "./src/index.js"
    },
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            "@src": path.resolve(__dirname, "./src")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: othername("img")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    name: othername("fonts")
                }
            },
            {
                test: /\.ico$/,
                loader: "file-loader",
                options: {
                    name: "./[name].ico"
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                SPLIT: process.env.SPLIT,
                PROJECT: JSON.stringify(process.env.PROJECT)
            }
        })
    ]
};

//webpack开发环境配置
var devConfig = {
    entry: {
        app: ["./src/index.js", "webpack-hot-middleware/client?noInfo=true&reload=true"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: filename(), //"./[name].[hash].js",
        chunkFilename: chunkFilename() //'./chunk/[id].[hash].js'
    },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    cssSourceMap: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        })
    ]
};

//webpack生产环境配置
var buildConfig = {
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: filename(),
        chunkFilename: chunkFilename()
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    sourceMap: true,
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: ["css-loader?minimize", "postcss-loader"],
                            fallback: "vue-style-loader" // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        }),
                        less: ExtractTextPlugin.extract({
                            use: ["css-loader?minimize", "postcss-loader", "less-loader"],
                            fallback: "vue-style-loader" // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            },
            {
                //配合ExtractTextPlugin使用
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize", "postcss-loader"]
                })
            },
            {
                //配合ExtractTextPlugin使用
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize", "postcss-loader", "less-loader"]
                })
            }
        ]
    },
    plugins: [
        //css单独出个文件
        new ExtractTextPlugin({
            filename: cssFilename(),
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: "dependency"
        }),
        // 分js打包
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, "./node_modules")) === 0;
            }
        })
    ]
};

var plugins = [];
if (JSON.parse(process.env.UGFJS)) {
    plugins.push(
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false
        })
    );
}

var config = {
    dev: devConfig,
    test: merge(buildConfig, {
        plugins: plugins
    }),
    production: merge(buildConfig, {
        plugins: plugins
    })
};

module.exports = merge(basicConfig, config[process.env.NODE_ENV]);