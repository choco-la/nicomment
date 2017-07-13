(function() {
	"use strict";
	const docRoot = document;

	// if isSeek is true, dont adjust
	let isSeek = false;

	function MenuBox() {
		this.menuBoxElem = docRoot.createElement("div");
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
	}

	MenuBox.prototype.insert = function() {
		const screen = docRoot.getElementsByClassName("CommentScreen")[0];
		const layer = docRoot.getElementsByClassName("hc-layer")[-1];
		const newnode = screen.insertBefore(this.menuBoxElem, layer);
		return newnode;
	}


	function create_show_area() {
		const area = docRoot.createElement("div");
		area.style.display = "block";
		area.style.position = "absolute";
		area.style.bottom = "0.0em";
		area.style.height = "0.2em";
		area.style.width = "100%";
		area.style.zIndex = "99";
		area.style.backgroundColor = "#6B6B6B";
		area.className = "show_control_area";

		function toggle_box() {
			const state = menuBoxNode.style.display;
			if (state == "table") {
				menuBoxNode.style.display = "none";
			}
			else if (state == "none") {
				menuBoxNode.style.display = "table";
			}
		}

		area.onclick = toggle_box;
		const screen = docRoot.getElementsByClassName("CommentScreen")[0];
		const layer = docRoot.getElementsByClassName("hc-layer")[-1];
		const newnode = screen.insertBefore(area, layer);
		return newnode;
	}


	function MediaBar() {
		this.barElem = docRoot.createElement("input");
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
	}

	MediaBar.prototype.append = function(node) {
		const newnode = node.appendChild(timeBar.barElem);
		return newnode;
	}


	function ControlBtn() {
		this.btnFrame = docRoot.createElement("div");
		this.btnFrame.style.display = "table-cell";
		this.btnFrame.style.width = "6%";
		this.btnFrame.style.paddingLeft = "1%";
		this.btnFrame.style.verticalAlign = "middle";
		this.btnFrame.style.fontSize = "0.6em";
	}

	ControlBtn.prototype.set_text = function(str) {
		this.btnFrame.innerText = str;
	}

	ControlBtn.prototype.set_class = function(clsname) {
		this.btnFrame.className = clsname;
	}

	ControlBtn.prototype.append = function(node) {
		const newnode = node.appendChild(this.btnFrame);
		return newnode;
	}


	function toggle_play_stop(event) {
		return function(event) {
			const media = docRoot.getElementsByClassName("drop_playing")[0];
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
			const media = docRoot.getElementsByClassName("drop_playing")[0];
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
			const media = docRoot.getElementsByClassName("drop_playing")[0];
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


	const menu = new MenuBox();
	const menuBoxNode = menu.insert();
	create_show_area();

	const playBtn = new ControlBtn();
	playBtn.btnFrame.onclick = toggle_play_stop();
	playBtn.set_text("||");
	playBtn.append(menuBoxNode);

	const timeBar = new MediaBar();
	const timeBarNode = timeBar.append(menuBoxNode);
	timeBarNode.onchange = function(event) {
		isSeek = true;
		const media = docRoot.getElementsByClassName("drop_playing")[0];
		if (media != undefined) {
			const percent = parseFloat(event.target.value) / 100;
			const medialength = media.duration;
			const seektime = medialength * percent;
			media.currentTime = seektime;
		}
	}

	const muteBtn = new ControlBtn();
	muteBtn.btnFrame.onclick = mute_media();
	muteBtn.set_text("🔊");
	muteBtn.append(menuBoxNode);

	const clearBtn = new ControlBtn();
	clearBtn.set_text("ｘ");
	clearBtn.btnFrame.onclick = clear_media();
	clearBtn.append(menuBoxNode);


	function adjustTime() {
		// avoid overwrite seeking value
		if (isSeek == true) {
			isSeek = false;
			return;
		}
		const media = docRoot.getElementsByClassName("drop_playing")[0];
		if (media != undefined) {
			const medialength = media.duration;
			const current = media.currentTime;
			timeBar.barElem.value = current / medialength * 100;
			isSeek = false;
		}
	}

	// adjust seekbar position to media currentTime
	// media.timeupdate is too severe to seek
	setInterval(adjustTime, 1000);
	menuBoxNode.style.display = "none";
})();
