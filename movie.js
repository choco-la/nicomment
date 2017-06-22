(function() {
	// to check canPlayType
	var videoElement = document.createElement("video");


	function load_file(file) {
		"use strict";
		var reader = new FileReader();

		reader.onload = (function() {
			return function(e) {
				if (videoElement.canPlayType(file.type) != ""){
					file.src = e.target.result;
					var appendMedia = new MediaToAppend(file);
					appendMedia.create();
					appendMedia.play();
				}
			};
		})(file);
		reader.readAsDataURL(file);
	}


	function handle_dropover(event) {
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
		  load_file(file);
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
		this.blobUrl = window.URL.createObjectURL(this.src);
		this.create = function() {
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


	function create_dnd() {
		"use strict";
		var dnd = document.createElement("div");
		dnd.style.position = "absolute";
		dnd.style.display = "block";
		dnd.style.height = "50%";
		dnd.style.width = "24%";
		dnd.style.top = "0px";
		dnd.style.right = "1%";

		dnd.style.zIndex = "2";
		dnd.style.backgroundColor = "#FF8AB9";
		dnd.style.opacity = "0";
		dnd.style.borderRadius = "8%";

		dnd.setAttribute("draggable", "true");
		dnd.setAttribute("class", "dnd_area");

		dnd.onmouseover = function() {
			dnd.style.opacity = "0.1";
		}
		dnd.onmouseout = function() {
			dnd.style.opacity = "0";
		}

		var cmt = document.getElementsByClassName("CommentPanel is-active")[0];
		cmt.appendChild(dnd);

		dnd.addEventListener("dragover", handle_dropover, false);
		dnd.addEventListener("drop", halt_media, false);
		dnd.addEventListener("drop", handle_drop, false);
	}

	create_dnd();

})()
