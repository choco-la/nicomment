(function() {
	// to check canPlayType
	var videoElement = document.createElement("video");


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
				appendMedia.create();
				appendMedia.play();
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
			if (videoElement.canPlayType(file.type) != "") {
				load_file(file);
			}
			else {
				console.log("cannot play");
				return false;
			}
		}
	}


	// stop, delete video element if exists
	function halt_media() {
		"use strict";
		if (document.querySelector("video") != null) {
			var video = document.querySelector("video");
			video.removeAttribute("src");
			video.load();
			video.parentNode.removeChild(video);
		}
	}


	function MediaToAppend(src) {
		"use strict";
		this.src = src;

		this.create = function() {
			this.blobUrl = window.URL.createObjectURL(this.src);
			this.videoElem = document.createElement("video");

			this.videoElem.style.position = "relative";
			this.videoElem.style.display = "block";
			this.videoElem.style.height = "100%";
			this.videoElem.style.width = "100%";
			this.videoElem.style.zIndex = "-1";

			this.videoElem.setAttribute("src", this.blobUrl);
			this.videoElem.controls = "true";

			var screen = document.getElementsByClassName("CommentScreen")[0];
			var layer = document.getElementsByClassName("hc-layer")[-1];
			screen.insertBefore(this.videoElem, layer);
		}

		this.play = function() {
			this.videoElem.play();
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
