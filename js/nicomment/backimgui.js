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
