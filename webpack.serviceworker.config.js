"use strict";

const webpack = require("webpack");
const glob = require("glob");

function generateOutputFilesList() {
    const urlList = require("./config_arr_file.js");
    const staticList = glob.sync("./static/**/*.+(html|ico|css|jpg|png)").map((s) => s.replace("./static/", "/"));
    const outputJs = glob.sync("./static/output/*.js").map((s) => s.replace("./static/", "/"));
    return urlList.concat(staticList).concat(outputJs);
}

module.exports = {
    entry: "./static/serviceworker/serviceworker-template.js",
    output: {
        path: __dirname + "/static/output/",
        filename: "service-worker.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            MY_STRING: JSON.stringify(generateOutputFilesList()),
            MY_VERSION: JSON.stringify(Math.random().toString())
        })
    ]
};
