var streaming = false,
	video = document.querySelector('#video'),
	videoContainer = document.querySelector('#videoContainer'),
	cameraCanvas = document.querySelector('#cameraCanvas'),
	startButton = document.querySelector('#startButton'),
	width = 320,
	height = 0;

if (navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({video: true})
		.then(function (stream) {
			video.srcObject = stream;
		})
		.catch(function (err) {
			console.log("Something went wrong! " + err);
		});
}

video.addEventListener('canplay', function () {
	if (!streaming) {
		height = video.videoHeight / (video.videoWidth / width);
		video.setAttribute('width', width);
		video.setAttribute('height', height);
		cameraCanvas.setAttribute('width', width);
		cameraCanvas.setAttribute('height', height);
		streaming = true;
	}
}, false);

function takePicture() {
	video.style.display = "none";
	cameraCanvas.style.display = "block";
	startButton.innerText = "Retake";
	cameraCanvas.width = width;
	cameraCanvas.height = height;
	cameraCanvas.getContext('2d').drawImage(video, 0, 0, width, height);
	var data = cameraCanvas.toDataURL();

	cameraCanvas.src = data;
	return true;
}

// functions are called on event
startButton.addEventListener('click', function (ev) {
	if (startButton.innerText === "Capture") {
		takePicture();

		// turn on continue button
		btnOK.style.display = "inline";

		// Hide video container
		videoContainer.style.display = "none";
	}
	else {
		video.style.display = "block";
		btnOK.style.display = "none";
		videoContainer.style.display = "inline";
		cameraCanvas.style.display = "none";
		startButton.innerText = "Capture";
	}
	ev.preventDefault();
}, false);

document.getElementById('btnOK').addEventListener('click', function () {
	imageLoaded(event);
});

// Construct a PhotoDetector
var detector = new affdex.PhotoDetector();

// Enable detection of all Emojis classifiers.
detector.detectAllEmojis();

// Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener("onInitializeSuccess", function () {
	log('#logs', "Ready for meming!");
	$("#upload_button").css("visibility", "visible");
});

// variable for emoji
var g_emoji

// Add a callback to receive the results from processing an image.
// The faces object contains the list of the faces detected in an image.
// Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener("onImageResultsSuccess", function (faces, image) {
	drawImage(image);
	$('#results').html("");
	if (faces.length > 0) {
		var emoji = faces[0].emojis.dominantEmoji;
		g_emoji = emoji;
		log('#results', "Emoji: " + emoji);
		putTextOnPic();
	}
	else {
		log('#results', 'No faces were found!')
	}
});

// Add a callback to notify if failed receive the results from processing an image.
detector.addEventListener("onImageResultsFailure", function () {
	log('#logs', 'Please wait until initialized!');
});

// Initialize the emotion detector
log("#logs", "Starting the face detector... please wait...");
detector.start();

// Once the image is loaded, pass it down for processing
function imageLoaded() {
	var contxt = image_canvas.getContext('2d');
	contxt.canvas.width = cameraCanvas.width;
	contxt.canvas.height = cameraCanvas.height;
	contxt.drawImage(cameraCanvas, 0, 0, cameraCanvas.width, cameraCanvas.height);

	// Pass the image to the detector to track emotions
	if (detector && detector.isRunning) {
		detector.process(contxt.getImageData(0, 0, cameraCanvas.width, cameraCanvas.height), 0);
	}
}

// Load the selected image
function loadFile(event) {
	$('#results').html("");
	var img = new Image();
	var reader = new FileReader();
	reader.onload = function () {
		img.onload = imageLoaded;
		img.src = reader.result;
	};
	reader.readAsDataURL(event.target.files[0]);
};

// Convienence function for logging to the DOM
function log(node_name, msg) {
	$(node_name).append("<span>" + msg + "</span><br />")
}

// Draw Image to container
function drawImage(img) {
	var contxt = $('#image_canvas')[0].getContext('2d');

	var temp = document.createElement('canvas').getContext('2d');
	temp.canvas.width = img.width;
	temp.canvas.height = img.height;
	temp.putImageData(img, 0, 0);

	var image = new Image();
	image.src = temp.canvas.toDataURL("image/png");

	// Scale the image to 640x480 - the size of the display container.
	contxt.canvas.width = img.width <= 640 ? img.width : 640;
	contxt.canvas.height = img.height <= 480 ? img.height : 480;

	var hRatio = contxt.canvas.width / img.width;
	var vRatio = contxt.canvas.height / img.height;
	var ratio = Math.min(hRatio, vRatio);

	// Draw the image on the display canvas
	contxt.clearRect(0, 0, contxt.canvas.width, contxt.canvas.height);

	contxt.scale(ratio, ratio);
	contxt.drawImage(image, 0, 0);
}

// array of possible emojis
// 1-smile 2-laughing 3-relaxed 4-wink 5-kissing 6-tongue 7-wink/tongue
// 8-scream 9-flushed 10-smirk 11-disappointed 12-rage 13-neutral	
var g_emojis_memes = ["😃", "😆", "☺", "😉", "😗", "😛", "😜", "😱", "😳", "😏", "😟", "😞", "😐"];

var g_memetext = ""; // text to go on meme

var randomnumber = Math.floor(Math.random() * 4); // random number to choose random associated meme

// multidimensional array for memes	
function FileHelper() { }

function putTextOnPic() {
	FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
		var request = new XMLHttpRequest();
		request.open("GET", pathOfFileToReadFrom, false);
		request.send(null);
		var returnValue = request.responseText;
		return returnValue;
	};


	var text = FileHelper.readStringFromFileAtPath("memetext.txt"); // read from text file
	// text = text.toUpperCase;
	var arrayOfLines = text.split("\n"); // split text into array by line
	var memes = new Array(13);
	var number_memes, counter;
	counter = 0;
	for (i = 0; i < 13; i++) {
		number_memes = arrayOfLines[counter];
		counter++;
		memes[i] = new Array(number_memes);

		for (j = 0; j < number_memes; j++) {
			memes[i][j] = new Array(2)
			memes[i][j][0] = arrayOfLines[counter];
			counter++;
			memes[i][j][1] = arrayOfLines[counter];
			counter++;
		}
	}

	function mememaker(top_text, bottom_text) {
		var imageObj = new Image();
		var ctx = image_canvas.getContext('2d');
		ctx.clearRect(0, 0, image_canvas.width, image_canvas.height);
		imageObj.onload = function () {
			ctx.drawImage(imageObj, 0, 0);
			ctx.lineWidth = 5;
			ctx.font = '20pt Impact';
			ctx.strokeStyle = 'black';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.lineJoin = 'round';

			// Draw the bottom text
			bottom_text = bottom_text.toUpperCase();
			x = image_canvas.width / 2;
			y = image_canvas.height - image_canvas.height / 10;
			ctx.strokeText(bottom_text, x, y);
			ctx.fillText(bottom_text, x, y);

			// Draw the top text
			top_text = top_text.toUpperCase();
			x = image_canvas.width / 2;
			y = image_canvas.height - image_canvas.height / 1.15;
			ctx.strokeText(top_text, x, y);
			ctx.fillText(top_text, x, y);
		};
		imageObj.src = cameraCanvas.src;
	};

	// switch/case to identify emoji/make meme
	switch (g_emoji) {
		case g_emojis_memes[0]:
			var n = Math.floor(Math.random() * memes[0].length)
			mememaker(memes[0][n][0], memes[0][n][1])
			break;
		case g_emojis_memes[1]:
			var n = Math.floor(Math.random() * memes[1].length)
			mememaker(memes[1][n][0], memes[1][n][1])
			break;
		case g_emojis_memes[2]:
			var n = Math.floor(Math.random() * memes[2].length);
			mememaker(memes[2][n][0], memes[2][n][1])
			break;
		case g_emojis_memes[3]:
			var n = Math.floor(Math.random() * memes[3].length);
			mememaker(memes[3][n][0], memes[3][n][1])
			break;
		case g_emojis_memes[4]:
			var n = Math.floor(Math.random() * memes[4].length);
			mememaker(memes[4][n][0], memes[4][n][1])
			break;
		case g_emojis_memes[5]:
			var n = Math.floor(Math.random() * memes[5].length);
			mememaker(memes[5][n][0], memes[5][n][1])
			break;
		case g_emojis_memes[6]:
			var n = Math.floor(Math.random() * memes[6].length);
			mememaker(memes[6][n][0], memes[6][n][1])
			break;
		case g_emojis_memes[7]:
			var n = Math.floor(Math.random() * memes[7].length);
			mememaker(memes[7][n][0], memes[7][n][1])
			break;
		case g_emojis_memes[8]:
			var n = Math.floor(Math.random() * memes[8].length);
			mememaker(memes[8][n][0], memes[8][n][1])
			break;
		case g_emojis_memes[9]:
			var n = Math.floor(Math.random() * memes[9].length);
			mememaker(memes[9][n][0], memes[9][n][1])
			break;
		case g_emojis_memes[10]:
			var n = Math.floor(Math.random() * memes[10].length);
			mememaker(memes[10][n][0], memes[10][n][1])
			break;
		case g_emojis_memes[11]:
			var n = Math.floor(Math.random() * memes[11].length);
			mememaker(memes[11][n][0], memes[11][n][1])
			break;
		case g_emojis_memes[12]:
			var n = Math.floor(Math.random() * memes[12].length);
			mememaker(memes[12][n][0], memes[12][n][1])
			break;
	}
};

/** This is the function that will take care of image extracting and
setting proper filename for the download.
IMPORTANT: Call it from within a onclick event. **/
function downloadCanvas(link, canvasId, filename) {
	link.href = document.getElementById(canvasId).toDataURL();
	link.download = filename;
}

/** The event handler for the link's onclick event. We give THIS as a
parameter (=the link element), ID of the canvas and a filename. */
document.getElementById('download').addEventListener('click', function () {
	downloadCanvas(this, 'image_canvas', 'meme me.png');
}, false);