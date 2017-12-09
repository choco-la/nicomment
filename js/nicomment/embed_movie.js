"use strict";
exports.__esModule = true;
var typeguards_1 = require("../common/typeguards");
exports.embedMovie = function (root) {
    var insertEmbedMovie = function (id, node) {
        var embed = document.createElement('iframe');
        embed.src = "https://embed.nicovideo.jp/watch/" + id + "?oldScript=1&from=0&allowProgrammaticFullScreen=1";
        embed.style.display = 'block';
        embed.style.height = '100%';
        embed.style.width = '100%';
        var frameNode = node.appendChild(embed);
        return frameNode;
    };
    var clearMedia = function () {
        var media = root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        console.log('rm media');
        media.removeAttribute('src');
        media.load();
        media.className = 'drop_' + media.tagName.toLowerCase();
        media.style.display = 'none';
    };
    var removeEmbedMovie = function (parent) {
        for (var indx = 0; indx < parent.childNodes.length; indx++) {
            var node = parent.childNodes[indx];
            if (!typeguards_1["default"].isIFrame(node) || !node.parentNode)
                return;
            node.parentNode.removeChild(node);
        }
    };
    var playEmbedMovie = function () {
        var input = window.prompt('Input ID (ex: sm9)');
        if (input === null || input.length === 0)
            return;
        var trimmed = input.trim();
        if (trimmed.length === 0)
            return;
        var videoID = input.match(/s[mo][0-9]{1,10}/);
        if (videoID === null)
            return;
        var movieArea = document.getElementsByClassName('drop_media_box')[0];
        if (!typeguards_1["default"].isHTMLElem(movieArea))
            return console.log('No movieArea found');
        console.log('play embed');
        removeEmbedMovie(movieArea);
        clearMedia();
        insertEmbedMovie(videoID[0], movieArea);
    };
    var keyShortcut = function (event) {
        if (root.activeElement.tagName !== 'INPUT' && event.ctrlKey === true && event.keyCode === 86) {
            playEmbedMovie();
        }
    };
    window.addEventListener('keydown', keyShortcut, false);
};
