var rpsWinSound = new Audio("audio/Trill.ogg");
var rpsLoseSound = new Audio("audio/Clink.ogg");
var rpsTieSound = new Audio("audio/Strum.ogg");
var backgroundSound = new Audio("audio/bensound-memories.mp3");

function backgroundPlay() {
	backgroundSound.play();
	backgroundSound.currentTime=0;
	backgroundSound.loop=true;
	$("#audioOn").toggle();
	$("#audioOff").toggle();
}

function backgroundPause() {
	backgroundSound.pause();
	$("#audioOn").toggle();
	$("#audioOff").toggle();
}

function muteRPS() {
	rpsWinSound.muted = true;
	rpsLoseSound.muted = true;
	rpsTieSound.muted = true;
	$("#rpsMute").toggle();
	$("#rpsUnmute").toggle();
}

function unmuteRPS() {
	rpsWinSound.muted = false;
	rpsLoseSound.muted = false;
	rpsTieSound.muted = false;
	$("#rpsMute").toggle();
	$("#rpsUnmute").toggle();
}

var userChoice;
function rpsChoose(rpsChoice){
	userChoice = rpsChoice;
}

function startRps() {
	var computerChoice = Math.random();
	if (computerChoice < 0.34) {
		computerChoice = "Rock";
	} else if (computerChoice <= 0.67) {
		computerChoice = "Paper";
	} else {
		computerChoice = "Scissors";
	}

	document.getElementById("textUserChoice").innerHTML = "You: " + userChoice;
	document.getElementById("textComputerChoice").innerHTML = "Computer: " + computerChoice;

	var win = "You win!";
	var lose = "You lose!";
	var tie = "Tie!";

	function compare(userChoice, computerChoice) {
		if (userChoice === computerChoice) {
			changeTheme("tie");
			return tie.fontcolor("#FFEB3B").bold();
		} else if (userChoice === "Rock") {
			if (computerChoice === "Scissors") {
				changeTheme("win");
				return "Rock smashes scissors; " + win.fontcolor("#4CAF50").bold();
			} else {
				changeTheme("lose");
				return "Paper covers rock; " + lose.fontcolor("#F44336").bold();
			}
		} else if (userChoice === "Paper") {
			if (computerChoice === "Rock") {
				changeTheme("win");
				return "Paper covers rock; " + win.fontcolor("#4CAF50").bold();
			} else {
				changeTheme("lose");
				return "Scissors cut paper; " + lose.fontcolor("#F44336").bold();
			}
		} else if (userChoice === "Scissors") {
			if (computerChoice === "Rock") {
				changeTheme("lose");
				return "Rock smashes scissors; " + lose.fontcolor("#F44336").bold();
			} else {
				changeTheme("win");
				return "Scissors cut paper; " + win.fontcolor("#4CAF50").bold();
			}
		}
	}

	function changeChromeTheme(color) {
		$("#chromeTheme")
			.attr("content", color)
			.delay(300)
			.queue(function() {
				$(this).attr("content", "#1976D2").dequeue();
			});
		}

	function changeIconTheme(color) {
		$("i")
			.css("color", color)
			.delay(500)
			.queue(function() {
				$(this).css("color", "rgb(64, 196, 255)").dequeue();
			});
		}

	function showLoad() {
		$(".gameIcon")
			.toggle()
			.delay(500)
			.queue(function() {
				$(this).toggle().dequeue();
			});
		$("md-progress-circular")
			.toggle()
			.delay(500)
			.queue(function() {
				$(this).toggle().dequeue();
			});
	}

	function changeTheme(rpsOutcome) {
		if (rpsOutcome === "win") {
			changeIconTheme("#4CAF50");
			changeChromeTheme("#4CAF50");
			showLoad();
			rpsWinSound.play();
			rpsWinSound.currentTime=0;
			navigator.vibrate(200);
		} else if (rpsOutcome === "lose") {
			changeIconTheme("#F44336");
			changeChromeTheme("#F44336");
			showLoad();
			rpsLoseSound.play();
			rpsLoseSound.currentTime=0;
			navigator.vibrate(200);
		} else if (rpsOutcome === "tie") {
			changeIconTheme("#FFEB3B");
			changeChromeTheme("#FFEB3B");
			showLoad();
			rpsTieSound.play();
			rpsTieSound.currentTime=0;
			navigator.vibrate(200);
		}
	}

	var result = (compare(userChoice, computerChoice));
	document.getElementById("textResult").innerHTML = result;
}