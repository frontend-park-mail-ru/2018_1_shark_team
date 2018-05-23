"use strict";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = {
    entry: "./src/modules/Start.js",
    output: {
        path: __dirname + "/dest",
        filename: "bundle.js"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dest"
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: "pug-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader"
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: "./**/*.+(html|ico|jpg|png|mp3)", to: ".", context: "src"},
        ]),
        new UglifyJsPlugin(),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
        }),
    ]

};
