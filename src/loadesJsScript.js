/* eslint-disable no-console */
"use strict";

(function () {

    function contorolVersionOfApplication() {
        console.log("Control version");
        var value = localStorage.getItem("MAX");
        if(value) {
            return null;
        }
        localStorage.clear();
        localStorage.setItem("MAX", "OK");
    }


    var can = document.getElementsByClassName("loader-box__canvas-plain")[0];
    var holst = can.getContext("2d");

    var charsBox = document.getElementsByClassName("loader-box__procent-field")[0];
    charsBox.innerHTML = "&nbsp;&nbsp;" + "&nbsp;&nbsp;";

    contorolVersionOfApplication();

    function printChars(number) {
        var answer = "";
        for (var i = 0; i < number; i += 1) {
            answer = answer + "&#9899;" + " ";
        }
        answer = "&nbsp;&nbsp;" + answer + "&nbsp;&nbsp;";
        charsBox.innerHTML = answer;
    }

    holst.fillStyle = "#111a51";
    holst.strokeStyle = "#FFFFFF";
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

    var loadingInterval = setInterval(function () {
        clearCanvas(holst);
        drawRectangle(holst, size);
        drawRectangle(holst, size - 15);
        size += 2;
        if (size > 90) {
            size = 20;
        }
    }, 50);

    var chars = 0;

    function myQuery(url, callback) {
        var r = new XMLHttpRequest();
        r.open("GET", url, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.setRequestHeader("Cache-Control", "max-age=31536000");
        r.send(null);
        r.onreadystatechange = function () {
            if (r.readyState === 4 && r.status === 200) {
                var result = r.responseText;
                r = null;
                chars++;
                printChars(chars);
                callback(result);
            }
        };
    }

    function getElement(s) {
        return document.getElementsByClassName(s)[0];
    }

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    var s1 = "<img src = \"/images/fon.jpg\" class = \"bg__background-picture\">";

    var s2 = "<audio class = \"music-box__clip-1\">\n" +
        "            <source src = \"/music/popcorn.mp3\">\n" +
        "        </audio>\n" +
        "\n" +
        "        <audio class = \"music-box__clip-2\">\n" +
        "            <source src = \"/music/lazer_shot.mp3\">\n" +
        "        </audio>\n" +
        "\n" +
        "        <audio class = \"music-box__clip-3\">\n" +
        "            <source src = \"/music/bang_rocket.mp3\">\n" +
        "        </audio>";

    var s3 = "<script src = \"/bundle.js\"></script>";

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    var jsCode = "";

    myQuery("/images/fon.jpg", function () {
        // myQuery("/music/popcorn.mp3", function () {
            // myQuery("/music/lazer_shot.mp3", function () {
            //     myQuery("/music/bang_rocket.mp3", function () {  // FIXME
                    myQuery("/bundle.js", function (result) {
                        jsCode = result + "";
                        myQuery("/gameFiles/images/ammo.png", function () {
                            myQuery("/gameFiles/images/ballOK.png", function () {
                                myQuery("/gameFiles/images/bonusLive.png", function () {
                                    myQuery("/gameFiles/images/enemyOK.png", function () {
                                        myQuery("/gameFiles/images/fonOK.jpg", function () {
                                            myQuery("/gameFiles/images/rocketOK.png", function () {
                                                myQuery("/gameFiles/images/star.png", function () {
                                                    /////////////////////////////////////////////////////////////////////////////
                                                    /////////////////////////////////////////////////////////////////////////////
                                                    console.log("LOADING OK");
                                                    clearInterval(loadingInterval);
                                                    //////
                                                    getElement("bg").innerHTML = s1;
                                                    getElement("music-box").innerHTML = s2;
                                                    getElement("script-box").innerHTML = s3;
                                                    //////
                                                    getElement("loader-box").hidden = true;
                                                    getElement("bg").hidden = false;
                                                    document.querySelector("#workspace").hidden = false;
                                                    // eval(jsCode);
                                                    /////////////////////////////////////////////////////////////////////////////
                                                    /////////////////////////////////////////////////////////////////////////////
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        // });
                    // });
                // });
            });
        });
    });

})();
