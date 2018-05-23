"use strict";

const webpack = require("webpack");
const glob = require("glob");

function generateOutputFilesList() {
    const urlList = require("./config_arr_file.js");
    const staticList = glob.sync("./dest/**/*").map((s) => s.replace("./dest/", "/"));
    return urlList.concat(staticList);
}

module.exports = {
    entry: "./src/service-worker-template.js",
    output: {
        path: __dirname + "/dest",
        filename: "service-worker.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            MY_STRING: JSON.stringify(generateOutputFilesList()),
            MY_VERSION: JSON.stringify(Math.random().toString())
        })
    ]
};
