(function() {
	// to check canPlayType
	var videoElement = document.createElement("video");
	var audioElement = document.createElement("audio");


	function load_file(file) {
		"use strict";
		var reader = new FileReader();

		reader.onload = (function() {
			return function() {
				if (appendMedia == null) {
					var appendMedia = new MediaToAppend(file);
				}
				else {
					appendMedia.src = file;
				}

				switch (true) {
					case /video\/*/.test(file.type):
						appendMedia.create("video");
						break;
					case /audio\/*/.test(file.type):
						appendMedia.create("audio");
						break;
				}
				appendMedia.insert();
				appendMedia.play();
			};
		})(file);

		reader.readAsDataURL(file);
	}


	function load_img(file) {
		"use strict";
		var reader = new FileReader();

		reader.onload = (function() {
			return function() {
				if (appendMedia == null) {
					var appendMedia = new MediaToAppend(file);
				}
				else {
					appendMedia.src = file;
				}

				appendMedia.create("img");
				appendMedia.mediaElem.style.width = "auto";
				appendMedia.mediaElem.style.height = "auto";
				appendMedia.mediaElem.style.maxWidth = "100%";
				appendMedia.mediaElem.style.maxHeight = "100%";


				appendMedia.insert();
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
				case /video\/*/.test(file.type):
					if (videoElement.canPlayType(file.type) != "") {
						console.log("load video");
						load_file(file);
					}
					break;
				case /audio\/*/.test(file.type):
					if (audioElement.canPlayType(file.type) != "") {
						console.log("load audio");
						load_file(file);
					}
					break;
				case /image\/*/.test(file.type):
					console.log("load img");
					load_img(file);
					break;
			}
		}
	}


	// stop, delete media element if exists
	function halt_media() {
		"use strict";
		var media = document.getElementsByClassName("drop_media")[0];
		if (media != undefined) {
			media.removeAttribute("src");
			// not to load img
			if (media.tagName == "AUDIO" || media.tagName == "VIDEO") {
				media.load();
			}
			media.parentNode.removeChild(media);
		}
	}


	function MediaToAppend(src) {
		"use strict";
		this.src = src;

		this.create = function(tag) {
			this.blobUrl = window.URL.createObjectURL(this.src);
			this.mediaElem = document.createElement(tag);

			this.mediaElem.style.position = "relative";
			this.mediaElem.style.display = "block";
			this.mediaElem.style.height = "100%";
			this.mediaElem.style.width = "100%";
			this.mediaElem.style.zIndex = "-1";

			this.mediaElem.setAttribute("src", this.blobUrl);
			this.mediaElem.setAttribute("class", "drop_media");
// 			this.mediaElem.controls = "true";
		}

		this.insert = function() {
			var screen = document.getElementsByClassName("CommentScreen")[0];
			var layer = document.getElementsByClassName("hc-layer")[-1];
			screen.insertBefore(this.mediaElem, layer);
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


	create_droparea();
})()
