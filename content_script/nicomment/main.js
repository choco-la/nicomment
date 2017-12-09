(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./typeguards":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.menuBoxTop = function (name) {
    var menuBoxElem = document.createElement('div');
    menuBoxElem.style.position = 'absolute';
    menuBoxElem.style.top = '0.2em';
    menuBoxElem.style.width = '100%';
    menuBoxElem.style.display = 'table';
    menuBoxElem.style.opacity = '1.0';
    menuBoxElem.style.margin = 'auto';
    menuBoxElem.style.zIndex = '95';
    menuBoxElem.style.backgroundColor = '#FFD0E5';
    menuBoxElem.style.border = '0.1em solid';
    menuBoxElem.style.borderBottom = '0.0em';
    menuBoxElem.setAttribute('class', name);
    return menuBoxElem;
};
exports.menuBoxBottom = function (name) {
    var menuBoxElem = document.createElement('div');
    menuBoxElem.style.position = 'absolute';
    menuBoxElem.style.bottom = '0.2em';
    menuBoxElem.style.width = '100%';
    menuBoxElem.style.display = 'table';
    menuBoxElem.style.opacity = '1.0';
    menuBoxElem.style.margin = 'auto';
    menuBoxElem.style.zIndex = '95';
    menuBoxElem.style.backgroundColor = '#FFD0E5';
    menuBoxElem.style.border = '0.1em solid';
    menuBoxElem.style.borderBottom = '0.0em';
    menuBoxElem.setAttribute('class', name);
    return menuBoxElem;
};
exports.mediaBarOne = function (name) {
    var barElem = document.createElement('input');
    barElem.style.display = 'table-cell';
    barElem.type = 'range';
    barElem.min = '0.0';
    barElem.max = '1.0';
    barElem.step = '0.1';
    barElem.value = '1.0';
    barElem.setAttribute('class', name);
    barElem.style.margin = 'auto';
    barElem.style.height = '100%';
    barElem.style.width = '100%';
    return barElem;
};
exports.mediaBarCent = function (name) {
    var barElem = document.createElement('input');
    barElem.style.display = 'table-cell';
    barElem.type = 'range';
    barElem.min = '0';
    barElem.max = '100';
    barElem.step = '1';
    barElem.value = '0';
    barElem.setAttribute('class', name);
    barElem.style.margin = 'auto';
    barElem.style.height = '100%';
    barElem.style.width = '100%';
    return barElem;
};
exports.controlBtn = function () {
    var btnFrame = document.createElement('div');
    btnFrame.style.display = 'table-cell';
    btnFrame.style.width = '6%';
    btnFrame.style.paddingLeft = '1%';
    btnFrame.style.verticalAlign = 'middle';
    btnFrame.style.fontSize = '0.6em';
    return btnFrame;
};
exports.createImgMenu = function () {
    var area = document.createElement('div');
    area.style.display = 'block';
    area.style.position = 'absolute';
    area.style.top = '0.0em';
    area.style.height = '0.2em';
    area.style.width = '100%';
    area.style.zIndex = '99';
    area.style.backgroundColor = '#6B6B6B';
    area.className = 'show_imgmenu_area';
    return area;
};
exports.createColorPicker = function () {
    var picker = document.createElement('input');
    picker.type = 'color';
    picker.style.display = 'table-cell';
    picker.style.cssFloat = 'none';
    picker.style.marginLeft = '4%';
    picker.style.width = '8%';
    return picker;
};
exports.createShowArea = function () {
    var area = document.createElement('div');
    area.style.display = 'block';
    area.style.position = 'absolute';
    area.style.bottom = '0.0em';
    area.style.height = '0.2em';
    area.style.width = '100%';
    area.style.zIndex = '99';
    area.style.backgroundColor = '#6B6B6B';
    area.className = 'show_control_area';
    return area;
};

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var typeguards_1 = require("../common/typeguards");
var uiparts_1 = require("../common/uiparts");
exports.bgImgUI = function (root) {
    var screen = root.getElementsByClassName('CommentScreen')[0];
    var layersColl = root.getElementsByClassName('hc-layer');
    var layer = layersColl[layersColl.length - 1];
    var bgColor = root.getElementsByClassName('bg_color')[0];
    if (!typeguards_1["default"].isHTMLElem(screen))
        return console.log('No screen found');
    if (!typeguards_1["default"].isHTMLElem(layer))
        return console.log('No layer found');
    if (!typeguards_1["default"].isHTMLElem(bgColor))
        return console.log('No bgColor found.');
    var toggleBox = function () {
        if (!typeguards_1["default"].isHTMLElem(menuBoxNode))
            return;
        var state = menuBoxNode.style.display;
        if (state === 'table') {
            menuBoxNode.style.display = 'none';
        }
        else if (state === 'none') {
            menuBoxNode.style.display = 'table';
        }
    };
    var clearMedia = function () {
        bgColor.style.backgroundColor = 'transparent';
    };
    var changeBGColor = function (event) {
        if (!typeguards_1["default"].isInput(event.target))
            return;
        bgColor.style.backgroundColor = event.target.value;
    };
    var menu = uiparts_1.menuBoxTop('imgmenubox');
    var menuBoxNode = screen.insertBefore(menu, layer);
    var imgMenu = uiparts_1.createImgMenu();
    imgMenu.onclick = toggleBox;
    screen.appendChild(imgMenu);
    var transpBar = uiparts_1.mediaBarOne('img_transparent_bar');
    var transpBarNode = menuBoxNode.appendChild(transpBar);
    transpBarNode.onchange = function (event) {
        var mediaBox = root.getElementsByClassName('drop_media_box')[0];
        if (!typeguards_1["default"].isHTMLElem(mediaBox))
            return console.log('No mediaBox found.');
        if (!typeguards_1["default"].isInput(event.target))
            return;
        var percent = event.target.value;
        mediaBox.style.opacity = percent;
    };
    var colorAlphaBar = uiparts_1.mediaBarOne('color_trans_bar');
    colorAlphaBar.style.width = '80%';
    colorAlphaBar.style.cssFloat = 'left';
    var alphaColorNode = menuBoxNode.appendChild(colorAlphaBar);
    alphaColorNode.onchange = function (event) {
        if (!typeguards_1["default"].isInput(event.target))
            return;
        var percent = event.target.value;
        bgColor.style.opacity = percent;
    };
    var colorPicker = uiparts_1.createColorPicker();
    colorPicker.onchange = changeBGColor;
    menuBoxNode.appendChild(colorPicker);
    var clearBtn = uiparts_1.controlBtn();
    clearBtn.innerText = 'ｘ';
    clearBtn.onclick = clearMedia;
    menuBoxNode.appendChild(clearBtn);
    if (typeguards_1["default"].isHTMLElem(menuBoxNode))
        menuBoxNode.style.display = 'none';
};

},{"../common/typeguards":2,"../common/uiparts":3}],5:[function(require,module,exports){
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

},{"../common/typeguards":2}],6:[function(require,module,exports){
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

},{"../common/ctrl_media":1,"../common/typeguards":2}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var backimgui_1 = require("./backimgui");
var embed_movie_1 = require("./embed_movie");
var keyshortcut_1 = require("./keyshortcut");
var mediaui_1 = require("./mediaui");
var movie_1 = require("./movie");
movie_1.movieJS(document);
mediaui_1.mediaUI(document);
backimgui_1.bgImgUI(document);
embed_movie_1.embedMovie(document);
keyshortcut_1.spaceShortcut(document);

},{"./backimgui":4,"./embed_movie":5,"./keyshortcut":6,"./mediaui":8,"./movie":9}],8:[function(require,module,exports){
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

},{"../common/ctrl_media":1,"../common/typeguards":2,"../common/uiparts":3}],9:[function(require,module,exports){
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

},{"../common/typeguards":2}]},{},[7]);
