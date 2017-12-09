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
