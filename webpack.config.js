"use strict";

module.exports = {
    entry: "./static/modules/Start.js",
    output: {
        path: __dirname + "/static/output/webpack_output/",
        filename: "result.js"
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: "pug-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["absolute/path/a", "absolute/path/b"]
                    }
                }]
            }
        ]
    }
};
