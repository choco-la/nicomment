#!/bin/bash
tsc

mkdir -p ./content_script/nicomment/
browserify ./js/nicomment/main.js -o ./content_script/nicomment/main.js

mkdir -p ./content_script/web/
browserify ./js/web/main.js -o ./content_script/web/main.js
