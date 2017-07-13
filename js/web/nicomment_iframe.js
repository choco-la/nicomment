(function() {
	"use strict";

	// remove announce area
	const remove_announce = () => {
		const niconnect = document.getElementsByClassName("nico-connect-account")[0];
		const ulAnnounce = document.getElementsByClassName("announcements")[0];
		
		niconnect.parentNode.removeChild(niconnect);
		ulAnnounce.parentNode.removeChild(ulAnnounce);
	}


	// not to upload when drop files
	const remove_upload = () => {
		const upload = document.getElementsByClassName("upload-area")[0];

		upload.parentNode.removeChild(upload);
	}


	// control-button box
	const create_btn_box = (classname, color) => {
		const box = document.createElement("div");
		box.style.display = "block";
		box.style.position = "absolute";
		box.style.height = "auto";
		box.style.width = "100%";
		box.style.bottom = "0.0em";
		box.style.textAlign = "center";
		box.style.backgroundColor = color;
		box.style.borderRadius = "1%";
		box.className = classname;

		const drawer = document.getElementsByClassName("drawer__inner")[0];
		const newnode = drawer.appendChild(box);
		return newnode;
	}


	// append nicomment iframe to node
	const insert_nicomment_iframe = (node) => {
		const nicommentPath = "/nicomment";
		const frame = document.createElement("iframe");
		frame.src = nicommentPath;
		frame.style.display = "block";
		frame.style.height = "auto";
		frame.style.width = "100%";
		frame.style.marginTop = "10px";
		frame.style.marginBottom = "10px";
		frame.className = "nicomment_inner_frame";

		const frameNode = node.appendChild(frame);
		frameNode.onload = movie_js;
		return frameNode;
	}


	// control button constructor
	const ControlButton = function(text, classname) {
		this.elem = document.createElement("button");
		this.elem.style.display = "block";
		this.elem.style.height = "3.0em";
		this.elem.style.lineHeight = this.elem.style.height;
		this.elem.style.width = "94%";
		this.elem.style.color = "#FFFFFF";
		this.elem.style.border = "none";
		this.elem.style.backgroundColor = "#747F9A";
		this.elem.style.margin = "3%";
		this.elem.className = classname;
		this.elem.style.borderRadius = "0.4em";
		this.elem.innerText = text;

		this.elem.onmouseover = (event) => {
			event.target.style.opacity = "0.8";
		}

		this.elem.onmouseout = (event) => {
			event.target.style.opacity = "1.0";
		}
	}

	ControlButton.prototype.append = function(node) {
		return node.appendChild(this.elem);
	}


	// toggle displaying columns
	const toggle_columns_display = () => {
		const columnList = document.getElementsByClassName("column");
		[].forEach.call(columnList, (element) => {
			const state = element.style.display;
			// state is blank at first
			if (state == "none") {
				element.style.display = "flex";
			}
			else {
				element.style.display = "none";
			}
		})
	}


	const movie_js = () => {
		const docRoot = document.getElementsByClassName("nicomment_inner_frame")[0].contentWindow.document;

		//	/^video\/.*/ breaks syntax highlight
		const reVideoType = new RegExp("^video/.*");
		const reAudioType = new RegExp("^audio/.*");
		const reImageType = new RegExp("^image/.*");

		const reader = new FileReader();

		function load_video(file) {
			reader.onload = (function() {
				return function() {
					appendVideo.set_src(file);
					appendVideo.set_playing();
					appendVideo.show();
					appendVideo.play();
				};
			})(file);

			// dont use image to background
			boxNode.style.backgroundImage = "none";
			reader.readAsDataURL(file);
		}


		function load_audio(file) {
			reader.onload = (function() {
				return function() {
					appendAudio.set_src(file);
					appendAudio.set_playing();
					appendAudio.show();
					appendAudio.play();
				};
			})(file);

			reader.readAsDataURL(file);
		}


		// image
		function load_img(file) {
			reader.onload = (function() {
				return function() {
					const blobUrl = window.URL.createObjectURL(file);
					const img = "url(" + blobUrl + ")";
					boxNode.style.backgroundImage = img;
				};
			})(file);

			reader.readAsDataURL(file);
		}


		function handle_dragover(event) {
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = "copy";
			return false;
		}


		function handle_drop(event) {
			event.stopPropagation();
			event.preventDefault();

			const files = event.dataTransfer.files;

			for (let i = 0, file; file = files[i]; i++) {
				console.log("load");

				switch (true) {
					case reVideoType.test(file.type):
						if (videoElement.canPlayType(file.type) != "") {
							console.log("load video");
							load_video(file);
						}
						break;
					case reAudioType.test(file.type):
						if (audioElement.canPlayType(file.type) != "") {
							console.log("load audio");
							load_audio(file);
						}
						break;
					case reImageType.test(file.type):
						console.log("load img");
						load_img(file);
						break;
				}
			}
		}


		// stop, delete media element if exists
		function halt_media() {
			const media = docRoot.getElementsByClassName("drop_playing")[0];
			if (media != undefined) {
				console.log("rm media");
				media.removeAttribute("src");
				media.load();
				media.className = "drop_" + media.tagName.toLowerCase();
				media.style.display = "none";
			}
		}


		// media handling constructor
		function MediaBox() {
			this.divElem = docRoot.createElement("div");

			this.divElem.style.position = "relative";
			this.divElem.style.display = "block";
			this.divElem.style.height = "100%";
			this.divElem.style.width = "100%";
			this.divElem.style.zIndex = "-1";
			this.divElem.setAttribute("class", "drop_media_box");

			this.divElem.style.backgroundSize = "cover";
			this.divElem.style.backgroundPosition = "center center";
		}

		MediaBox.prototype.insert = function() {
			const screen = docRoot.getElementsByClassName("CommentScreen")[0];
			const layer = docRoot.getElementsByClassName("hc-layer")[-1];
			const insertnode = screen.insertBefore(this.divElem, layer);
			return insertnode;
		}


		function MediaToAppend(type) {
			this.type = type;
			this.mediaElem = docRoot.createElement(this.type);

			this.mediaElem.style.position = "relative";
			this.mediaElem.style.display = "none";
			this.mediaElem.style.height = "100%";
			this.mediaElem.style.width = "100%";
			this.mediaElem.style.zIndex = "-1";

			this.mediaElem.loop = "true";
		}

		MediaToAppend.prototype.set_src = function(file) {
			this.src = file;
			this.blobUrl = window.URL.createObjectURL(this.src);
			this.mediaElem.setAttribute("src", this.blobUrl);
		}

		MediaToAppend.prototype.set_zindex = function(num) {
			this.mediaElem.style.zIndex = num;
		}

		MediaToAppend.prototype.show = function() {
			this.mediaElem.style.display = "block";
		}

		MediaToAppend.prototype.hide = function() {
			this.mediaElem.style.display = "none";
		}

		MediaToAppend.prototype.set_class = function(str) {
			this.mediaElem.className = str;
		}

		MediaToAppend.prototype.set_playing = function() {
			this.mediaElem.className = "drop_" + this.type + " " + "drop_playing";
		}

		MediaToAppend.prototype.unset_playing = function() {
			this.mediaElem.className = "drop_" + this.type;
		}

		MediaToAppend.prototype.append = function(node) {
			const appendnode = node.appendChild(this.mediaElem);
			return appendnode;
		}

		MediaToAppend.prototype.load = function() {
			this.mediaElem.load();
		}

		MediaToAppend.prototype.play = function() {
			this.mediaElem.play();
		}


		function create_droparea() {
			const dropArea = docRoot.getElementsByClassName("CommentPanel is-active")[0];
			dropArea.setAttribute("draggable", "true");
			dropArea.addEventListener("dragover", handle_dragover, false);
			dropArea.addEventListener("drop", halt_media, false);
			dropArea.addEventListener("drop", handle_drop, false);
		}


		const appendBox = new MediaBox();
		const boxNode = appendBox.insert();

		const appendVideo = new MediaToAppend("video");
		appendVideo.set_class("drop_video");
		const videoElement = appendVideo.append(boxNode);

		const appendAudio = new MediaToAppend("audio");
		appendAudio.set_class("drop_audio");
		const audioElement = appendAudio.append(boxNode);

		const appendColor = new MediaToAppend("div");
		appendColor.set_class("bg_color");
		appendColor.set_zindex("-3");
		appendColor.mediaElem.style.backgroundColor = "transparent";
		appendColor.mediaElem.style.display = "block";
		appendColor.mediaElem.style.position = "absolute";
		appendColor.mediaElem.style.top = "0.0em";
		appendColor.mediaElem.style.left = "0.0em";
		const screen = docRoot.getElementsByClassName("CommentScreen")[0];
		const layer = docRoot.getElementsByClassName("hc-layer")[-1];
		screen.insertBefore(appendColor.mediaElem, layer);

		create_droparea();
	}


/*	// try removing announce area
	try {
		remove_announce();
	}
	catch(err) {
		console.log(err);
	}*/


	try {
		remove_upload();
	}
	catch(err) {
		console.log(err);
	}

	// create control panel to append buttons
	const frame_control_panel = create_btn_box("frame_control_panel", "#EBEBEB");

	// append delete-iframe button, regist event listener
	const delete_iframe_btn = new ControlButton("nicomment形式を削除", "delete_iframe_btn");
	const deleteIframeBtnNode = delete_iframe_btn.append(frame_control_panel);
	deleteIframeBtnNode.addEventListener("click", (event) => {
		const delNode = document.getElementsByClassName("nicomment_inner_frame")[0];
		if (delNode != undefined) {
			delNode.parentNode.removeChild(delNode);
		}
	}, false)

	// append insert-iframe button, regist event listener
	const insert_iframe_btn = new ControlButton("nicomment形式を表示", "insert_iframe_btn");
	const insertIframeBtnNode = insert_iframe_btn.append(frame_control_panel);
	insertIframeBtnNode.addEventListener("click", (event) => {
		const insNode = document.getElementsByClassName("nicomment_inner_frame")[0];
		if (insNode == undefined) {
			insert_nicomment_iframe(nicomment_outer_frame);
		}
	}, false)

	// append toggle-columns-display button, regist event listener
	const toggle_columns_btn = new ControlButton("カラムの表示切替", "toggle_columns_btn");
	const toggleColumnsBtnNode = toggle_columns_btn.append(frame_control_panel);
	toggleColumnsBtnNode.addEventListener("click", toggle_columns_display, false)

	// append nicomment iframe to column-area at first
	const nicomment_outer_frame = document.getElementsByClassName("columns-area")[0];
	// insert_nicomment_iframe(nicomment_outer_frame);
})();
