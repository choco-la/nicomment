"use strict";
exports.__esModule = true;
var ctrl_media_1 = require("../common/ctrl_media");
var typeguards_1 = require("../common/typeguards");
exports.spaceShortcut = function (root) {
    var ctrl = new ctrl_media_1.ControlMedia(root);
    var keyShortcut = function (event) {
        if (root.activeElement.tagName !== 'INPUT' && event.keyCode === 32) {
            ctrl.togglePlayStop();
            toggleIcon();
        }
    };
    var toggleIcon = function () {
        var media = root.getElementsByClassName('drop_playing')[0];
        var btn = root.getElementsByClassName('toggle_play_stop')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        if (media.paused) {
            if (typeguards_1["default"].canInnertext(btn))
                btn.innerText = '▶';
        }
        else {
            if (typeguards_1["default"].canInnertext(btn))
                btn.innerText = '||';
        }
    };
    window.addEventListener('keydown', keyShortcut, false);
};
