"use strict";
exports.__esModule = true;
var ctrl_media_1 = require("../common/ctrl_media");
var typeguards_1 = require("../common/typeguards");
var uiparts_1 = require("../common/uiparts");
exports.mediaUI = function (root) {
    var isSeek = false;
    var ctrl = new ctrl_media_1.ControlMedia(root);
    var dropArea = root.getElementsByClassName('CommentPanel is-active')[0];
    var screen = root.getElementsByClassName('CommentScreen')[0];
    var layersColl = root.getElementsByClassName('hc-layer');
    var layer = layersColl[layersColl.length - 1];
    if (!typeguards_1["default"].isHTMLElem(dropArea))
        return console.log('No dropArea found');
    if (!typeguards_1["default"].isHTMLElem(screen))
        return console.log('No screen found');
    if (!typeguards_1["default"].isHTMLElem(layer))
        return console.log('No layer found');
    var toggleBox = function () {
        var state = menuBoxNode.style.display;
        if (state === 'table') {
            menuBoxNode.style.display = 'none';
        }
        else if (state === 'none') {
            menuBoxNode.style.display = 'table';
        }
    };
    var menu = uiparts_1.menuBoxBottom('menubox');
    var menuBoxNode = screen.insertBefore(menu, layer);
    var showArea = uiparts_1.createShowArea();
    showArea.onclick = toggleBox;
    screen.insertBefore(showArea, layer);
    var playBtn = uiparts_1.controlBtn();
    playBtn.className = 'toggle_play_stop';
    playBtn.addEventListener('click', function () { return ctrl.togglePlayStop(); }, false);
    playBtn.addEventListener('click', function (event) { return ctrl.toggleIcon(event); }, false);
    playBtn.innerText = '||';
    menuBoxNode.appendChild(playBtn);
    var timeBar = uiparts_1.mediaBarCent('mediabar');
    var timeBarNode = menuBoxNode.appendChild(timeBar);
    timeBarNode.onchange = function (event) {
        isSeek = true;
        var media = root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        if (!typeguards_1["default"].isInput(event.target))
            return;
        var percent = parseFloat(event.target.value) / 100;
        var medialength = media.duration;
        var seektime = medialength * percent;
        media.currentTime = seektime;
    };
    var muteBtn = uiparts_1.controlBtn();
    muteBtn.onclick = function (event) { return ctrl.muteMedia(event); };
    muteBtn.innerText = '🔊';
    menuBoxNode.appendChild(muteBtn);
    var clearBtn = uiparts_1.controlBtn();
    clearBtn.innerText = 'ｘ';
    clearBtn.addEventListener('click', function () { return ctrl.clearMedia(); }, false);
    clearBtn.addEventListener('click', function () { timeBar.value = '0'; }, false);
    menuBoxNode.appendChild(clearBtn);
    var adjustTime = function () {
        if (isSeek === true) {
            isSeek = false;
            return;
        }
        var media = root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        var medialength = media.duration;
        var current = media.currentTime;
        timeBar.value = String(current / medialength * 100);
        isSeek = false;
    };
    setInterval(adjustTime, 1000);
    menuBoxNode.style.display = 'none';
    dropArea.addEventListener('drop', function () { return ctrl.initBtn(); }, false);
};
