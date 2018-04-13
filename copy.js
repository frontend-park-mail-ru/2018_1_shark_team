"use strict";

console.log("======= Copy.js =========");

const fs = require('fs');

const data = fs.readFileSync('SERVICE_WORKER_TEMPLATE.js', 'utf8');

let arr = data.split("//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

const str = fs.readFileSync('config_arr_file.json', 'utf8');

let ans = arr[0] + "const cacheUrls = " + str + ";" + arr[1];

fs.writeFileSync("./static/service-worker.js", ans);

