(function() {
	function MenuBox() {
		this.menuBoxElem = document.createElement("div");
		this.menuBoxElem.style.position = "absolute";
		this.menuBoxElem.style.top = "0.2em";
		this.menuBoxElem.style.height = "0.8em";
		this.menuBoxElem.style.width = "100%";
		this.menuBoxElem.style.display = "table"
		this.menuBoxElem.style.opacity = "1.0";
		this.menuBoxElem.style.margin = "auto";

		this.menuBoxElem.style.zIndex = "95";
		this.menuBoxElem.style.backgroundColor = "#FFD0E5";
		this.menuBoxElem.style.border = "0.1em solid";
		this.menuBoxElem.style.borderBottom = "0.0em";

		this.menuBoxElem.setAttribute("class", "imgmenubox");

		this.append = function(node) {
			node.appendChild(this.menuBoxElem);
		}
	}


	function create_show_area() {
		var area = document.createElement("div");
		area.style.display = "block";
		area.style.position = "absolute";
		area.style.top = "0.0em";
		area.style.height = "0.2em";
		area.style.width = "100%";
		area.style.zIndex = "99";
		area.style.backgroundColor = "#6B6B6B";
		area.className = "show_imgmenu_area";

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
		screen.appendChild(area);
	}


	function MediaBar() {
		this.barElem = document.createElement("input");
		this.barElem.style.display = "table-cell";
		this.barElem.type = "range";
		this.barElem.min = "0.0";
		this.barElem.max = "1.0";
		this.barElem.step = "0.1";
		this.barElem.value = "1.0";
		this.barElem.setAttribute("class", "img_transparent_bar");

		this.barElem.style.margin = "auto";
		this.barElem.style.height = "100%";
		this.barElem.style.width = "100%";

		this.append = function(node) {
			node.appendChild(transpBar.barElem);
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
			var media = document.getElementsByClassName("bg_color")[0];
			if (media != undefined) {
				media.style.backgroundColor = "transparent";
			}
		}
	}


	function create_color_picker() {
		var colorPicker = document.createElement("input");
		colorPicker.type = "color";
		colorPicker.style.display = "table-cell";
		colorPicker.style.float = "none";
		colorPicker.style.marginLeft = "4%";
		colorPicker.style.width = "8%";
		function change_bg_color(event) {
			return function(event) {
				console.log(event.target.value);
				var bg = document.getElementsByClassName("bg_color")[0];
				bg.style.backgroundColor = event.target.value;
			}
		}
		colorPicker.onchange = change_bg_color();
		menuBoxNode.appendChild(colorPicker);
	}


	function dom_insert(elem) {
		var screen = document.getElementsByClassName("CommentScreen")[0];
		var layer = document.getElementsByClassName("hc-layer")[-1];
		screen.insertBefore(elem, layer);
	}


	menu = new MenuBox();
	dom_insert(menu.menuBoxElem);
	
	var menuBoxNode = document.getElementsByClassName("imgmenubox")[0];
	create_show_area();

	var transpBar = new MediaBar();
	transpBar.append(menuBoxNode);

	var colorAlphaBar = new MediaBar();
	colorAlphaBar.barElem.style.width = "80%";
	colorAlphaBar.barElem.className = "color_trans_bar";
	colorAlphaBar.barElem.style.float = "left";
	menuBoxNode.appendChild(colorAlphaBar.barElem);

	create_color_picker();

	var clearBtn = new ControlBtn();
	clearBtn.set_text("ｘ");
	clearBtn.btnFrame.onclick = clear_media();
	clearBtn.append(menuBoxNode);

	var transpBarNode = document.getElementsByClassName("img_transparent_bar")[0];
	transpBarNode.onchange = function(event) {
		var media = document.getElementsByClassName("drop_media_box")[0];
		if (media != undefined) {
			var percent = event.target.value;
			media.style.opacity = percent;
		}
	}
	var alphaColorNode = document.getElementsByClassName("color_trans_bar")[0];
	alphaColorNode.onchange = function(event) {
		var media = document.getElementsByClassName("bg_color")[0];
		if (media != undefined) {
			var percent = event.target.value;
			media.style.opacity = percent;
		}
	}
	menuBoxNode.style.display = "none";
})()
