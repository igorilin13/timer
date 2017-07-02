class BackgroundController {
	constructor() {
		//the last mode is all lists combined
		this.TOTAL_MODES = 3;
		this.SLIDESHOW_LENGTH_MILLIS = 60*60*1000;

		this.backgroundLists = [];
		this.currentMode = 0;
		this.backgroundsByMode = [3, 0, 3];
		this.currentIndexByMode = new Array(this.TOTAL_MODES).fill(0);
		this.slideshowTimerId = null;

		this.createBackgroundLists();
		this.updateUiBackground();
	}

	createBackgroundLists() {
		for (var i = 0; i < this.TOTAL_MODES - 1; i++) {
			this.backgroundLists[i] = new BackgroundList(i, this.backgroundsByMode[i]);
		}
		this.backgroundLists[this.TOTAL_MODES - 1] = new BackgroundList(this.TOTAL_MODES - 1, 
			this.backgroundsByMode[this.TOTAL_MODES - 1], this.backgroundLists);
	}

	showNextBackground() {
		this.currentIndexByMode[this.currentMode]++;

		if (this.currentIndexByMode[this.currentMode] >= this.backgroundsByMode[this.currentMode]) {
			this.currentIndexByMode[this.currentMode] = 0;
		}

		this.updateUiBackground();
	}

	showPrevBackground() {
		this.currentIndexByMode[this.currentMode]--;

		if (this.currentIndexByMode[this.currentMode] < 0) {
			this.currentIndexByMode[this.currentMode] = this.backgroundsByMode[this.currentMode] - 1;
		}

		this.updateUiBackground();
	}

	updateUiBackground() {
		var modeIndex = this.currentMode;
		if (this.backgroundsByMode[modeIndex] <= 0) {
			return;
		}
		var backgroundIndex = this.currentIndexByMode[modeIndex];
		var path = this.backgroundLists[modeIndex].getPathByIndex(backgroundIndex);
		$(document.body).css("background-image", "url('" + path + "')");
	}

	changeMode(newMode) {
		if (newMode == this.currentMode) {
			return;
		}

		$("[data-" + UiConstants.DATA_MODE + "=" + this.currentMode + "]").removeClass(UiConstants.CLASS_SELECTED_OPTION);
		$("[data-" + UiConstants.DATA_MODE + "=" + newMode + "]").addClass(UiConstants.CLASS_SELECTED_OPTION);

		this.currentMode = newMode;
		this.updateUiBackground();
	}

	toggleSlideShow() {
		if (this.slideshowTimerId != null) {
			clearInterval(this.slideshowTimerId);
			this.slideshowTimerId = null;
			UiConstants.ELEMENT_SET_SLIDESHOW.removeClass(UiConstants.CLASS_SELECTED_OPTION);
		} else {
			this.slideshowTimerId = setInterval(this.showNextBackground.bind(this), this.SLIDESHOW_LENGTH_MILLIS);
			UiConstants.ELEMENT_SET_SLIDESHOW.addClass(UiConstants.CLASS_SELECTED_OPTION);
		}
	}

	setSlideShow(mode) {
		if (mode == true && this.slideshowTimerId == null 
			|| mode == false && this.slideshowTimerId != null) {
			this.toggleSlideShow();
		}
	}
}