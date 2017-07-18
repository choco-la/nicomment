(function() {
	"use strict";
	const docRoot = document;

	function key_shortcut(event) {
		return function(event) {
			if (docRoot.activeElement.tagName != "INPUT" && event.keyCode == 32) {
				toggle_play_stop();
			}
		}
	}

	function toggle_play_stop() {
		const media = docRoot.getElementsByClassName("drop_playing")[0];
		const btn = docRoot.getElementsByClassName("toggle_play_stop")[0];
		if (media != undefined) {
			if (media.paused) {
				media.play();
				btn.innerText = "||";
			}
			else {
				media.pause();
				btn.innerText = "▶";
			}
		}
	}

	window.onkeydown = key_shortcut();

})();
