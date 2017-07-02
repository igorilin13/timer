$(window).on("load", function(){
	var main = new Main();
});

$(window).on("beforeunload", function() {
	return "Are you sure you want leave?";
});

class Main {
	constructor() {
		this.timerController = new TimerController();
		this.backgroundController = new BackgroundController();

		this.setEventHandlers();
		this.backgroundController.setSlideShow(true);
	}

	setEventHandlers() {
		var self = this;

		UiConstants.ELEMENTS_POPUP_HEADER.click(function(event) {
			var id = $(event.target).data(UiConstants.DATA_POPUP_ID);
			$("." + UiConstants.CLASS_POPUP_CONTENT + "[data-" + UiConstants.DATA_POPUP_ID + "=" + id + "]")
				.toggleClass(UiConstants.CLASS_SHOW);
		});

		$(window).keydown(function(event) {
			switch (event.keyCode) {
				case 13: //Enter
					self.timerController.start();
					break;
				case 32: //Space
					self.timerController.pause();
					break;
			}
		});

		/*
		* Timer event handlers
		*/
		UiConstants.ELEMENT_START_MAIN_TIMER.click(this.timerController.start.bind(this.timerController));

		UiConstants.ELEMENT_PAUSE_MAIN_TIMER.click(this.timerController.pause.bind(this.timerController));

		UiConstants.ELEMENT_RESET_MAIN_TIMER.click(this.timerController.reset.bind(this.timerController));

		UiConstants.ELEMENT_TAKE_BREAK.click(this.timerController.takeBreak.bind(this.timerController));

		UiConstants.ELEMENT_CANCEL_BREAK.click(this.timerController.cancelBreak.bind(this.timerController));

		UiConstants.ELEMENT_ABORT_BREAK.click(this.timerController.abortBreak.bind(this.timerController));

		UiConstants.ELEMENT_SUBMIT_NEW_TIMER.click(this.timerController.set.bind(this.timerController));

		UiConstants.ELEMENT_SUMBIT_MINUTES.click(function() {
			self.timerController.addSeconds(60 * UiConstants.ELEMENT_INPUT_MINUTES.val());
		});

		//Background event handlers
		UiConstants.ELEMENT_NEXT_BACKGROUND.click(this.backgroundController.showNextBackground
			.bind(this.backgroundController));

		UiConstants.ELEMENT_PREV_BACKGROUND.click(this.backgroundController.showPrevBackground
			.bind(this.backgroundController));

		UiConstants.ELEMENT_SET_SLIDESHOW.click(this.backgroundController.toggleSlideShow
			.bind(this.backgroundController));

		UiConstants.ELEMENTS_BACKGROUND_MODE.click(function(event) {
			self.backgroundController.changeMode(+$(event.target).data(UiConstants.DATA_MODE));
		});   
	}
}