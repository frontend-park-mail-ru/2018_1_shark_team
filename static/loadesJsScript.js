"use strict";

var can = document.getElementsByClassName("loader-box__canvas-plain")[0];
var holst = can.getContext('2d');

holst.fillStyle = "#111a51";
holst.strokeStyle = '#FFFFFF';
holst.lineWidth = 4;

function drawRectangle(holst, size) {
    var middle = size * 0.5;
    var value = 100 - middle;
    holst.strokeRect(value, value, size, size);
}

function clearCanvas(holst) {
    holst.clearRect(0, 0, 200, 200);
}

var size = 20;

var loadingInterval = setInterval(function() {
    clearCanvas(holst);
    drawRectangle(holst, size);
    drawRectangle(holst, size - 15);
    size += 2;
    if(size > 90) {
        size = 20;
    }
}, 50);
