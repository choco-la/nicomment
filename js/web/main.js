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
