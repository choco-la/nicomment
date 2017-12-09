"use strict";
exports.__esModule = true;
var typeguards_1 = require("../common/typeguards");
exports.movieJS = function (root) {
    var reVideoType = new RegExp('^video/.*');
    var reAudioType = new RegExp('^audio/.*');
    var reImageType = new RegExp('^image/.*');
    var reader = new FileReader();
    var screen = root.getElementsByClassName('CommentScreen')[0];
    var layersColl = root.getElementsByClassName('hc-layer');
    var layer = layersColl[layersColl.length - 1];
    if (!typeguards_1["default"].isHTMLElem(screen))
        return console.log('No screen found');
    if (!typeguards_1["default"].isHTMLElem(layer))
        return console.log('No layer found');
    var loadVideo = function (file) {
        return function () {
            var blobUrl = window.URL.createObjectURL(file);
            var type = appendVideo.tagName.toLowerCase();
            appendVideo.setAttribute('src', blobUrl);
            appendVideo.className = "drop_" + type + " drop_playing";
            appendVideo.style.display = 'block';
            if (typeguards_1["default"].isVideo(appendVideo))
                appendVideo.play();
        };
    };
    var loadAudio = function (file) {
        return function () {
            var blobUrl = window.URL.createObjectURL(file);
            var type = appendVideo.tagName.toLowerCase();
            appendAudio.setAttribute('src', blobUrl);
            appendAudio.className = "drop_" + type + " drop_playing";
            appendAudio.style.display = 'block';
            if (typeguards_1["default"].isAudio(appendAudio))
                appendAudio.play();
        };
    };
    var loadImg = function (file) {
        return function () {
            var blobUrl = window.URL.createObjectURL(file);
            var img = "url(" + blobUrl + ")";
            boxNode.style.backgroundImage = img;
        };
    };
    var handleDragOver = function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        return false;
    };
    var handleDrop = function (event) {
        event.stopPropagation();
        event.preventDefault();
        var files = event.dataTransfer.files;
        var file = files[0];
        console.log('load');
        switch (true) {
            case reVideoType.test(file.type):
                if (!typeguards_1["default"].isVideo(videoElement))
                    return;
                if (videoElement.canPlayType(file.type) !== '') {
                    console.log('load video');
                    reader.onload = loadVideo(file);
                    boxNode.style.backgroundImage = 'none';
                    reader.readAsDataURL(file);
                }
                break;
            case reAudioType.test(file.type):
                if (!typeguards_1["default"].isAudio(audioElement))
                    return;
                if (audioElement.canPlayType(file.type) !== '') {
                    console.log('load audio');
                    reader.onload = loadAudio(file);
                    reader.readAsDataURL(file);
                }
                break;
            case reImageType.test(file.type):
                console.log('load img');
                reader.onload = loadImg(file);
                reader.readAsDataURL(file);
                break;
        }
    };
    var haltMedia = function () {
        var media = root.getElementsByClassName('drop_playing')[0];
        if (!typeguards_1["default"].isAudio(media) && !typeguards_1["default"].isVideo(media))
            return console.log('No media found.');
        console.log('rm media');
        media.removeAttribute('src');
        media.load();
        media.className = 'drop_' + media.tagName.toLowerCase();
        media.style.display = 'none';
    };
    var mediaBox = function () {
        var divElem = root.createElement('div');
        divElem.style.position = 'relative';
        divElem.style.display = 'block';
        divElem.style.height = '100%';
        divElem.style.width = '100%';
        divElem.style.zIndex = '-1';
        divElem.setAttribute('class', 'drop_media_box');
        divElem.style.backgroundSize = 'cover';
        divElem.style.backgroundPosition = 'center center';
        return divElem;
    };
    var mediaToAppend = function (type) {
        var mediaElem = root.createElement(type);
        mediaElem.style.position = 'relative';
        mediaElem.style.display = 'none';
        mediaElem.style.height = '100%';
        mediaElem.style.width = '100%';
        mediaElem.style.zIndex = '-1';
        if (typeguards_1["default"].isAudio(mediaElem) || typeguards_1["default"].isVideo(mediaElem))
            mediaElem.loop = true;
        return mediaElem;
    };
    var createDropArea = function () {
        var dropArea = root.getElementsByClassName('CommentPanel is-active')[0];
        if (!typeguards_1["default"].isHTMLElem(dropArea))
            return console.log('No dropArea found');
        dropArea.setAttribute('draggable', 'true');
        dropArea.addEventListener('dragover', handleDragOver, false);
        dropArea.addEventListener('drop', haltMedia, false);
        dropArea.addEventListener('drop', handleDrop, false);
    };
    var appendBox = mediaBox();
    var boxNode = screen.insertBefore(appendBox, layer);
    var appendVideo = mediaToAppend('video');
    appendVideo.className = 'drop_video';
    var videoElement = boxNode.appendChild(appendVideo);
    var appendAudio = mediaToAppend('audio');
    appendAudio.className = 'drop_audio';
    var audioElement = boxNode.appendChild(appendAudio);
    var appendColor = mediaToAppend('div');
    appendColor.className = 'bg_color';
    appendColor.style.zIndex = '-3';
    appendColor.style.backgroundColor = 'transparent';
    appendColor.style.display = 'block';
    appendColor.style.position = 'absolute';
    appendColor.style.top = '0.0em';
    appendColor.style.left = '0.0em';
    screen.insertBefore(appendColor, layer);
    createDropArea();
};
