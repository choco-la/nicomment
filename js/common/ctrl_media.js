"use strict";
exports.__esModule = true;
var typeguards_1 = require("./typeguards");
var ControlMedia = (function () {
    function ControlMedia(root) {
        this.root = root;
    }
    ControlMedia.prototype.muteMedia = function (event) {
        var media = this.root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        if (media.muted) {
            console.log('unmute media');
            media.muted = false;
            if (typeguards_1["default"].canInnertext(event.target))
                event.target.innerText = '🔊';
        }
        else {
            console.log('mute media');
            media.muted = true;
            if (typeguards_1["default"].canInnertext(event.target))
                event.target.innerText = 'Ｍ';
        }
    };
    ControlMedia.prototype.clearMedia = function () {
        var media = this.root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        console.log('rm media');
        media.removeAttribute('src');
        media.load();
        media.className = 'drop_' + media.tagName.toLowerCase();
        media.style.display = 'none';
    };
    ControlMedia.prototype.togglePlayStop = function () {
        var media = this.root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        if (media.paused) {
            media.play();
        }
        else {
            media.pause();
        }
    };
    ControlMedia.prototype.toggleIcon = function (event) {
        var media = this.root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        if (!typeguards_1["default"].canInnertext(event.target))
            return;
        console.log("toggle icon from " + event.target.innerText);
        if (event.target.innerText === '▶')
            event.target.innerText = '||';
        else if (event.target.innerText === '||')
            event.target.innerText = '▶';
    };
    ControlMedia.prototype.initBtn = function () {
        var btn = this.root.getElementsByClassName('toggle_play_stop')[0];
        if (!typeguards_1["default"].canInnertext(btn))
            return console.log('No btn found.');
        btn.innerText = '||';
    };
    return ControlMedia;
}());
exports.ControlMedia = ControlMedia;
