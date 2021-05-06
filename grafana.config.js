const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "./src/main.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        //filename: "js/[name]-[hash:8].js",
        filename: "bundle.js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),

        //new webpack.IgnorePlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:8].css",
            //chunkFilename: 'css/[id]-[contenthash:8].css'
        }),
        new htmlWebpackPlugin({
            chunks: ['main'],
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html",
            // favicon: path.resolve('./src/favicon.svg'),
            // inject: true
        }),
    ],
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin()],
    },
    module: {
        rules: [{
                test: /\.html$/i,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 3 }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
                // use: [{
                //         loader: MiniCssExtractPlugin.loader,
                //         options: {
                //             publicPath: "../",
                //         },
                //     },
                //     {
                //         loader: "css-loader",
                //         options: { importLoaders: 3 },
                //     },
                //     {
                //         loader: "postcss-loader",
                //     },
                // ],
            },
            {
                test: /\.less$/i,
                //use: ['style-loader', 'css-loader', 'less-loader'],
                use: [{
                        loader: "css-loader",
                        options: { importLoaders: 3 }
                    },
                    {
                        loader: "less-loader",
                        options: { importLoaders: 3 }
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            },
            {
                test: /\.scss$/i,
                use: [{
                        loader: "css-loader",
                        options: { importLoaders: 3 }
                    },
                    {
                        loader: "sass-loader",
                        options: { importLoaders: 3 }
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif|bmp|jpe?g|svg)$/i,
                //use: 'url-loader?limit=31606&name=[name]-[hash:6].[ext]',
                use: [{
                        loader: "url-loader",
                        options: {
                            limit: (1024 * 1024 * 50),
                            encoding: true,
                            name: "[name]-[hash:8].[ext]",
                            //esModule: false,
                            //name: "img/[name]-[hash:8].[ext]",
                            //publicPath: "../",
                        },
                    },
                    {
                        loader: "image-webpack-loader"
                    },
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/i,
                use: [{
                    loader: "url-loader",
                    options: { esModule: false }
                }]
            },
            // {
            //     test: /\.(html|htm)$/i,
            //     use: 'html-withimg-loader',
            // },
            {
                test: /\.js$/i,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js(\?.*)?$/i,
                use: UglifyJsPlugin.loader,
                exclude: /(node_modules|libs)/,
            },
        ],
    },
    devServer: {
        open: true,
        port: 9527,
        contentBase: "src",
        hot: true,
    },
    mode: "development",
};