import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/tabs/secondary-tab.js';
import '@material/web/button/text-button.js';
import '@material/web/switch/switch.js';
import '@material/web/fab/fab.js';
import '@material/web/icon/icon.js';
import '@material/web/divider/divider.js';
import '@material/web/elevation/elevation.js';
import '@material/web/iconbutton/icon-button.js';

// function startup() {
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("/serviceWorker.js")
			.then(function (registration) {
				console.log("ServiceWorker registration successful with scope: ", registration.scope);
			}, function (err) {
				console.log("ServiceWorker registration failed: ", err);
			});
	});
}

const MDTabs = document.getElementById("tabBar");
let panels = document.querySelectorAll('[role="tabpanel"]');
MDTabs.addEventListener('change', () => {
	let activeTabIndex = MDTabs.activeTabIndex
	let tabs = MDTabs.children;

	for (let i = 0; i < tabs.length; i++) {
		if (i == activeTabIndex) {
			panels[i].classList.remove("hidden");
		} else {
			panels[i].classList.add("hidden");
		}
	}
});
// }

// startup();

let backgroundMusic
const toggleBackgroundMusicFAB = document.getElementById("toggleBackgroundMusicFAB");
toggleBackgroundMusicFAB.addEventListener("click", function () {
	if (typeof backgroundMusic == "undefined") {
		backgroundMusic = new Audio("static/audio/bensound-memories.mp3");
	}
	const musicOnIcon = document.getElementById("backgroundMusicOn");
	const musicOffIcon = document.getElementById("backgroundMusicOff");
	if (backgroundMusic.paused) {
		backgroundMusic.play();
		backgroundMusic.currentTime = 0;
		backgroundMusic.loop = true;
		toggleMusicIcons();
	} else {
		backgroundMusic.pause();
		toggleMusicIcons();
	}

	function toggleMusicIcons() {
		musicOnIcon.classList.toggle("hidden");
		musicOffIcon.classList.toggle("hidden");
	}
});

const rpsGameSoundToggler = document.getElementById("rpsGameSoundToggler");
rpsGameSoundToggler.addEventListener("click", function () {
	if (rpsWinSound.muted) {
		toggleRPSSoundMute(false);
	} else {
		toggleRPSSoundMute(true);
	}

	function toggleRPSSoundMute(isMuted) {
		rpsWinSound.muted = isMuted;
		rpsLoseSound.muted = isMuted;
		rpsTieSound.muted = isMuted;
	}
});

var root = document.querySelector(':root');
function newColors(background, surface, onSurface, dividerColor, primaryOnLight) {
	document.documentElement.style.setProperty("--mdc-theme-background", background);
	document.documentElement.style.setProperty("--md-sys-color-surface", surface);
	document.documentElement.style.setProperty("--md-primary-tab-label-text-color", onSurface);
	document.documentElement.style.setProperty("--md-primary-tab-hover-label-text-color", onSurface);
	document.documentElement.style.setProperty("--mdc-theme-surface", surface);
	document.documentElement.style.setProperty("--mdc-theme-on-surface", onSurface);
	document.documentElement.style.setProperty("--md-divider-color", dividerColor);
	document.documentElement.style.setProperty("--mdc-theme-text-primary-on-light", primaryOnLight);
}

function setLightTheme() {
	newColors("#fafafa", "#fff", "rgba(0,0,0,0.87)", "rgba(0, 0, 0, 0.15)", "rgba(0,0,0,.6)");
}

function setDarkTheme() {
	newColors("#121212", "#1d1d1d", "rgba(255,255,255,.87)", "rgba(255, 255, 255, 0.15)", "rgba(255,255,255,.6)");
}

const darkModeToggler = document.getElementById("darkModeToggler");

// Set theme to dark if no option in cache and user prefers dark or if dark was their last selected theme
switch (localStorage.getItem("lastUsedTheme")) {
	case null:
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			darkModeToggler.setAttribute("selected", true);
			setDarkTheme();
		}
		break;

	case "dark":
		darkModeToggler.setAttribute("selected", true);
		setDarkTheme();
		break;

	default:
		console.log("There was an error setting the page theme on load.");
		break;
}

darkModeToggler.addEventListener("click", function () {
	const currentColor = getComputedStyle(document.documentElement).getPropertyValue("--mdc-theme-background");
	// const hrs =
	if (currentColor === "#fafafa") {
		setDarkTheme();
		localStorage.setItem("lastUsedTheme", "dark");
		console.log("Switched to dark mode.");
	} else if (currentColor === "#121212") {
		setLightTheme();
		localStorage.setItem("lastUsedTheme", "light");
		console.log("Switched to light mode.");
	} else {
		console.log("Something went wrong with toggling the color scheme.");
	}
});

let rpsWinSound
let rpsLoseSound
let rpsTieSound

const gameTab = document.getElementById("gameTab");
gameTab.addEventListener("click", function () {
	if (typeof rpsWinSound === "undefined") {
		rpsWinSound = new Audio("static/audio/Trill.ogg");
		rpsLoseSound = new Audio("static/audio/Clink.ogg");
		rpsTieSound = new Audio("static/audio/Strum.ogg");
	}
});

const rockButton = document.getElementById("rockButton");
const paperButton = document.getElementById("paperButton");
const scissorsButton = document.getElementById("scissorsButton");
rockButton.addEventListener("click", function () {
	startRps("Rock")
});
paperButton.addEventListener("click", function () {
	startRps("Paper")
});
scissorsButton.addEventListener("click", function () {
	startRps("Scissors")
});

function startRps(userInput) {
	let userChoice = userInput
	let computerChoice = Math.random();
	if (computerChoice < 0.34) {
		computerChoice = "Rock";
	} else if (computerChoice <= 0.67) {
		computerChoice = "Paper";
	} else {
		computerChoice = "Scissors";
	}

	document.getElementById("textUserChoice").textContent = "You: " + userChoice;
	document.getElementById("textComputerChoice").textContent = "Computer: " + computerChoice;

	const win = "You win!";
	const lose = "You lose!";
	const tie = "Tie!";
	let result

	if (userChoice === computerChoice) {
		outcomeConsequences("tie");
		result = tie.fontcolor("#f2c438").bold();
	} else if (userChoice === "Rock") {
		if (computerChoice === "Scissors") {
			outcomeConsequences("win");
			result = "Rock smashes scissors; " + win.fontcolor("#4caf50").bold();
		} else {
			outcomeConsequences("lose");
			result = "Paper covers rock; " + lose.fontcolor("#f44336").bold();
		}
	} else if (userChoice === "Paper") {
		if (computerChoice === "Rock") {
			outcomeConsequences("win");
			result = "Paper covers rock; " + win.fontcolor("#4caf50").bold();
		} else {
			outcomeConsequences("lose");
			result = "Scissors cut paper; " + lose.fontcolor("#f44336").bold();
		}
	} else if (userChoice === "Scissors") {
		if (computerChoice === "Rock") {
			outcomeConsequences("lose");
			result = "Rock smashes scissors; " + lose.fontcolor("#f44336").bold();
		} else {
			outcomeConsequences("win");
			result = "Scissors cut paper; " + win.fontcolor("#4caf50").bold();
		}
	}

	document.getElementById("textResult").innerHTML = result;

	function outcomeConsequences(rpsOutcome) {
		if (rpsOutcome === "win") {
			rpsWinSound.play();
			rpsWinSound.currentTime = 0;
			navigator.vibrate(100);
		} else if (rpsOutcome === "lose") {
			rpsLoseSound.play();
			rpsLoseSound.currentTime = 0;
			navigator.vibrate(100);
		} else if (rpsOutcome === "tie") {
			rpsTieSound.play();
			rpsTieSound.currentTime = 0;
			navigator.vibrate(100);
		}
	}
}
