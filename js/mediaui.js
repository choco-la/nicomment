(function() {
	// if isSeek is true, dont adjust
	var isSeek = false;

	function MenuBox() {
		this.menuBoxElem = document.createElement("div");
		this.menuBoxElem.style.position = "absolute";
		this.menuBoxElem.style.bottom = "0.2em";
		this.menuBoxElem.style.height = "0.8em";
		this.menuBoxElem.style.width = "100%";
		this.menuBoxElem.style.display = "table"
		this.menuBoxElem.style.opacity = "1.0";
		this.menuBoxElem.style.margin = "auto";

		this.menuBoxElem.style.zIndex = "95";
		this.menuBoxElem.style.backgroundColor = "#FFD0E5";
		this.menuBoxElem.style.border = "0.1em solid";
		this.menuBoxElem.style.borderBottom = "0.0em";

		this.menuBoxElem.setAttribute("class", "menubox");

		this.insert = function() {
			var screen = document.getElementsByClassName("CommentScreen")[0];
			var layer = document.getElementsByClassName("hc-layer")[-1];
			screen.insertBefore(this.menuBoxElem, layer);
		}
	}


	function create_show_area() {
		var area = document.createElement("div");
		area.style.display = "block";
		area.style.position = "absolute";
		area.style.bottom = "0.0em";
		area.style.height = "0.2em";
		area.style.width = "100%";
		area.style.zIndex = "99";
		area.style.backgroundColor = "#6B6B6B";
		area.className = "show_control_area";

		function toggle_box() {
			var state = menuBoxNode.style.display;
			if (state == "table") {
				menuBoxNode.style.display = "none";
			}
			else if (state == "none") {
				menuBoxNode.style.display = "table";
			}
		}

		area.onclick = toggle_box;
		var screen = document.getElementsByClassName("CommentScreen")[0];
		var layer = document.getElementsByClassName("hc-layer")[-1];
		screen.insertBefore(area, layer);
	}


	function MediaBar() {
		this.barElem = document.createElement("input");
		this.barElem.style.display = "table-cell";
		this.barElem.type = "range";
		this.barElem.min = "0";
		this.barElem.max = "100";
		this.barElem.step = "1";
		this.barElem.value = "0";
		this.barElem.setAttribute("class", "mediabar");

		this.barElem.style.margin = "auto";
		this.barElem.style.height = "100%";
		this.barElem.style.width = "100%";

		this.append = function(node) {
			node.appendChild(timeBar.barElem);
		}
	}


	function ControlBtn() {
		"use strict";
		this.btnFrame = document.createElement("div");
		this.btnFrame.style.display = "table-cell";
		this.btnFrame.style.width = "6%";
		this.btnFrame.style.paddingLeft = "1%";
		this.btnFrame.style.verticalAlign = "middle";
		this.btnFrame.style.fontSize = "0.6em";

		this.set_text = function(str) {
			this.btnFrame.innerText = str;
		}

		this.set_class = function(clsname) {
			this.btnFrame.className = clsname;
		}

		this.append = function(node) {
			node.appendChild(this.btnFrame);
		}
	}


	function toggle_play_stop(event) {
		return function(event) {
			var media = document.getElementsByClassName("drop_playing")[0];
			if (media != undefined) {
				if (media.paused) {
					media.play();
					event.target.innerText = "||";
				}
				else {
					media.pause();
					event.target.innerText = "▶";
				}
			}
		}
	}


	// stop, delete media element if exists
	function mute_media(event) {
		return function(event) {
			"use strict";
			var media = document.getElementsByClassName("drop_playing")[0];
			if (media != undefined) {
				if (media.muted) {
					console.log("unmute media");
					media.muted = false;
					event.target.innerText = "🔊";
				}
				else {
					console.log("mute media");
					media.muted = true;
					event.target.innerText = "Ｍ";
				}
			}
		}
	}


	// stop, delete media element if exists
	function clear_media() {
		return function() {
			"use strict";
			var media = document.getElementsByClassName("drop_playing")[0];
			if (media != undefined) {
				console.log("rm media");
				media.removeAttribute("src");
				media.load();
				media.className = "drop_" + media.tagName.toLowerCase();
				media.style.display = "none";
				timeBar.barElem.value = 0;
			}
		}
	}


	menu = new MenuBox();
	menu.insert();
	var menuBoxNode = document.getElementsByClassName("menubox")[0];
	create_show_area();

	var playBtn = new ControlBtn();
	playBtn.btnFrame.onclick = toggle_play_stop();
	playBtn.set_text("||");
	playBtn.append(menuBoxNode);

	var timeBar = new MediaBar();
	timeBar.append(menuBoxNode);

	var muteBtn = new ControlBtn();
	muteBtn.btnFrame.onclick = mute_media();
	muteBtn.set_text("🔊");
	muteBtn.append(menuBoxNode);

	var clearBtn = new ControlBtn();
	clearBtn.set_text("ｘ");
	clearBtn.btnFrame.onclick = clear_media();
	clearBtn.append(menuBoxNode);

	var timeBarNode = document.getElementsByClassName("mediabar")[0];
	timeBarNode.onchange = function(event) {
		isSeek = true;
		var media = document.getElementsByClassName("drop_playing")[0];
		if (media != undefined) {
			var percent = parseFloat(event.target.value)/100;
			var medialength = media.duration;
			var seektime = medialength*percent;
			media.currentTime = seektime;
		}
	}

	adjustTime = function() {
			// avoid overwrite seeking value
			if (isSeek == true) {
				isSeek = false;
				return
			}
			var media = document.getElementsByClassName("drop_playing")[0];
			if (media != undefined) {
				var medialength = media.duration;
				var current = media.currentTime;
				timeBar.barElem.value = current/medialength*100;
				isSeek = false;
				
			}
		}

	// adjust seekbar position to media currentTime
	setInterval(adjustTime, 1000);
	menuBoxNode.style.display = "none";
})()
