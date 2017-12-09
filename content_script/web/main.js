(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var guards = {
    isHTMLElem: function (arg) {
        return arg !== undefined && arg !== null && arg.tagName.length > 0;
    },
    isMedia: function (arg) {
        return arg !== null && arg !== undefined && arg.tagName === 'MEDIA';
    },
    isAudio: function (arg) {
        return arg !== null && arg !== undefined && arg.tagName === 'AUDIO';
    },
    isVideo: function (arg) {
        return arg !== null && arg !== undefined && arg.tagName === 'VIDEO';
    },
    isInput: function (arg) {
        return arg !== undefined && arg !== null && arg.tagName === 'INPUT';
    },
    isIFrame: function (arg) {
        return arg !== null && arg !== undefined && arg.tagName === 'IFRAME';
    },
    isHTMLDoc: function (arg) {
        var typeStr = Object.prototype.toString.call(arg);
        var type = /\[object ([^\]]+)]/.exec(typeStr);
        if (type === null)
            return false;
        return arg !== null && arg !== undefined && type[1] === 'HTMLDocument';
    },
    canInnertext: function (arg) {
        return arg !== null && arg !== undefined && arg.innerText !== undefined;
    }
};
exports["default"] = guards;

},{}],2:[function(require,module,exports){
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

},{"../common/typeguards":1}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var typeguards_1 = require("../common/typeguards");
var movie_1 = require("../nicomment/movie");
var main = function () {
    try {
        removeUpload();
    }
    catch (err) {
        console.log(err);
    }
    var frameControlPanel = createBtnBox('frame_control_panel', '#EBEBEB');
    if (!typeguards_1["default"].isHTMLElem(frameControlPanel))
        return;
    var deleteIFrameBtn = controlButton('nicomment形式を削除', 'delete_iframe_btn');
    var deleteIframeBtnNode = frameControlPanel.appendChild(deleteIFrameBtn);
    deleteIframeBtnNode.addEventListener('click', function (_) {
        var delNode = document.getElementsByClassName('nicomment_inner_frame')[0];
        if (!typeguards_1["default"].isHTMLElem(delNode) || !delNode.parentNode)
            return;
        delNode.parentNode.removeChild(delNode);
        insertIframeBtnNode.disabled = false;
        deleteIframeBtnNode.disabled = true;
    }, false);
    var insertIFrameBtn = controlButton('nicomment形式を表示', 'insert_iframe_btn');
    var insertIframeBtnNode = frameControlPanel.appendChild(insertIFrameBtn);
    insertIframeBtnNode.addEventListener('click', function (_) {
        var insNode = document.getElementsByClassName('nicomment_inner_frame')[0];
        if (insNode !== undefined || !typeguards_1["default"].isHTMLElem(nicommentOuterFrame))
            return;
        insertNicommendIFrame(nicommentOuterFrame);
        insertIframeBtnNode.disabled = true;
        deleteIframeBtnNode.disabled = false;
    }, false);
    var toggleColumnsBtn = controlButton('カラムの表示切替', 'toggle_columns_btn');
    var toggleColumnsBtnNode = frameControlPanel.appendChild(toggleColumnsBtn);
    toggleColumnsBtnNode.addEventListener('click', toggleColumnsDisplay, false);
    var nicommentOuterFrame = document.getElementsByClassName('columns-area')[0];
};
var removeUpload = function () {
    var upload = document.getElementsByClassName('upload-area')[0];
    if (!typeguards_1["default"].isHTMLElem(upload) || !upload.parentNode)
        return;
    upload.parentNode.removeChild(upload);
};
var createBtnBox = function (classname, color) {
    var box = document.createElement('div');
    box.style.display = 'block';
    box.style.position = 'relative';
    box.style.height = 'auto';
    box.style.width = '100%';
    box.style.bottom = '0.0em';
    box.style.textAlign = 'center';
    box.style.backgroundColor = color;
    box.style.borderRadius = '1%';
    box.className = classname;
    var drawer = document.getElementsByClassName('drawer__inner')[0];
    if (!typeguards_1["default"].isHTMLElem(drawer))
        return console.log('No drawer found');
    var newnode = drawer.appendChild(box);
    return newnode;
};
var onFrameLoad = function () {
    var frame = document.getElementsByClassName('nicomment_inner_frame')[0];
    if (!typeguards_1["default"].isIFrame(frame))
        return;
    var root = frame.contentWindow.document;
    if (!typeguards_1["default"].isHTMLDoc(root))
        return console.log('root is not HTMLDocument');
    movie_1.movieJS(root);
};
var insertNicommendIFrame = function (node) {
    var frame = document.createElement('iframe');
    frame.src = '/nicomment';
    frame.style.display = 'block';
    frame.style.height = 'auto';
    frame.style.width = '100%';
    frame.style.marginTop = '10px';
    frame.style.marginBottom = '10px';
    frame.className = 'nicomment_inner_frame';
    var frameNode = node.appendChild(frame);
    frameNode.onload = onFrameLoad;
    return frameNode;
};
var controlButton = function (text, classname) {
    var elem = document.createElement('button');
    elem.style.display = 'block';
    elem.style.height = '3.0em';
    elem.style.lineHeight = elem.style.height;
    elem.style.width = '94%';
    elem.style.color = '#FFFFFF';
    elem.style.border = 'none';
    elem.style.backgroundColor = '#747F9A';
    elem.style.margin = '3%';
    elem.className = classname;
    elem.style.borderRadius = '0.4em';
    elem.innerText = text;
    elem.onmouseover = function (event) {
        if (!typeguards_1["default"].isHTMLElem(event.target))
            return;
        event.target.style.opacity = '0.8';
    };
    elem.onmouseout = function (event) {
        if (!typeguards_1["default"].isHTMLElem(event.target))
            return;
        event.target.style.opacity = '1.0';
    };
    return elem;
};
var toggleColumnsDisplay = function () {
    var columnList = document.getElementsByClassName('column');
    Array.prototype.forEach.call(columnList, function (element) {
        var state = element.style.display;
        if (state === 'none') {
            element.style.display = 'flex';
        }
        else {
            element.style.display = 'none';
        }
    });
};
setTimeout(main, 1000);

},{"../common/typeguards":1,"../nicomment/movie":2}]},{},[3]);
