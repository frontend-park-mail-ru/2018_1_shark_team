"use strict";

module.exports = {
    entry: "./static/modules/Start.js",
    output: {
        path: __dirname + "/static/output",
        filename: "result.js"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./static"
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
    }
};
