const path = require('path');
const newHtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const saveCopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","postcss-loader","sass-loader"]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new newHtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            filename: "css/style.css"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new saveCopyWebpackPlugin([{
            from: "src/img",
            to: "img"
        }])
    ]
}