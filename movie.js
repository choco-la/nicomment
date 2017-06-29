(function() {
	// to check canPlayType
	var videoElement = document.createElement("video");
	var audioElement = document.createElement("audio");

//	/^video\/.*/ breaks syntax highlight
	var reVideoType = new RegExp("^video/.*");
	var reAudioType = new RegExp("^audio/.*");
	var reImageType = new RegExp("^image/.*");

	var reader = new FileReader();

	function load_video(file) {
		"use strict";
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
		"use strict";
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
		"use strict";
		reader.onload = (function() {
			return function() {
// 				appendMedia.mediaElem.style.opacity = "0.8";
				var blobUrl = window.URL.createObjectURL(file);
				var img = "url(" + blobUrl + ")";
				boxNode.style.backgroundImage = img;
			};
		})(file);

		reader.readAsDataURL(file);
	}


	function handle_dragover(event) {
		"use strict";
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
		return false;
	}


	function handle_drop(event) {
		"use strict";
		event.stopPropagation();
		event.preventDefault();

		var files = event.dataTransfer.files;

		for (var i = 0, file; file = files[i]; i++) {
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
		"use strict";
		var media = document.getElementsByClassName("drop_playing")[0];
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
		"use strict";
		this.divElem = document.createElement("div");

		this.divElem.style.position = "relative";
		this.divElem.style.display = "block";
		this.divElem.style.height = "100%";
		this.divElem.style.width = "100%";
		this.divElem.style.zIndex = "-1";
		this.divElem.setAttribute("class", "drop_media_box");

		this.divElem.style.backgroundSize = "cover";
		this.divElem.style.backgroundPosition = "center center";

		this.insert = function() {
			var screen = document.getElementsByClassName("CommentScreen")[0];
			var layer = document.getElementsByClassName("hc-layer")[-1];
			screen.insertBefore(this.divElem, layer);
		}
	}


	function MediaToAppend(type) {
		"use strict";
		this.type = type;
		this.mediaElem = document.createElement(this.type);

		this.mediaElem.style.position = "relative";
		this.mediaElem.style.display = "none";
		this.mediaElem.style.height = "100%";
		this.mediaElem.style.width = "100%";
		this.mediaElem.style.zIndex = "-1";

		//this.mediaElem.controls = "false";
		this.mediaElem.loop = "true";

		this.set_src = function(file) {
			this.src = file;
			this.blobUrl = window.URL.createObjectURL(this.src);
			this.mediaElem.setAttribute("src", this.blobUrl);
		}

		this.set_zindex = function(num) {
			this.mediaElem.style.zIndex = num;
		}

		this.show = function() {
			this.mediaElem.style.display = "block";
		}

		this.hide = function() {
			this.mediaElem.style.display = "none";
		}

		this.set_class = function(str) {
			this.mediaElem.className = str;
		}

		this.set_playing = function() {
			this.mediaElem.className = "drop_" + this.type + " " + "drop_playing";
		}

		this.unset_playing = function() {
			this.mediaElem.className = "drop_" + this.type;
		}

		this.append = function(node) {
			node.appendChild(this.mediaElem);
		}

		this.load = function() {
			this.mediaElem.load();
		}

		this.play = function() {
			this.mediaElem.play();
		}
	}


	function create_droparea() {
		"use strict";
		var dropArea = document.getElementsByClassName("CommentPanel is-active")[0];
		dropArea.setAttribute("draggable", "true");
		dropArea.addEventListener("dragover", handle_dragover, false);
		dropArea.addEventListener("drop", halt_media, false);
		dropArea.addEventListener("drop", handle_drop, false);
	}


	var appendBox = new MediaBox();
	appendBox.insert();
	var boxNode = document.getElementsByClassName("drop_media_box")[0];

	var appendVideo = new MediaToAppend("video");
	appendVideo.set_class("drop_video");
	appendVideo.append(boxNode);

	var appendAudio = new MediaToAppend("audio");
	appendAudio.set_class("drop_audio");
	appendAudio.append(boxNode);

	create_droparea();
})()
