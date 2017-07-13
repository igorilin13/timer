class TimerController {
	constructor() {
		this.BREAK_LENGTH_SECONDS = 10 * 60;

		this.mainTimer = new Timer(UiConstants.ELEMENT_MAIN_TIMER, (function() {
			UiConstants.ELEMENT_MAIN_TIMER.addClass(UiConstants.CLASS_FINISHED);
			this.cancelBreak();
		}).bind(this));

		this.breakTimer = new Timer(UiConstants.ELEMENT_BREAK_TIMER, this.abortBreak.bind(this));
		this.mainTimerEndClock = new Clock(UiConstants.ELEMENT_END_TIMER);

		this.set();
	}

	set() {
		this.reset();

		var hours = +UiConstants.ELEMENT_SET_HOURS.val();
		var minutes = +UiConstants.ELEMENT_SET_MINUTES.val();
		var seconds = +UiConstants.ELEMENT_SET_SECONDS.val();

		if (hours >= 0 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
			var totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
			UiConstants.ELEMENT_TOTAL_TIME.text(Utils.toHHMMSS(totalSeconds));
			this.mainTimer.set(totalSeconds);
			this.startNewEndClock();
		} else {
			Utils.showIncorrectInputNotification();
		}
	}

	reset() {
		this.mainTimer.reset();
		this.breakTimer.reset();
		this.startNewEndClock();

		UiConstants.ELEMENT_NOTIFICATION.removeClass(UiConstants.CLASS_SHOW);
		UiConstants.ELEMENT_MAIN_TIMER.removeClass(UiConstants.CLASS_FINISHED);
	}

	start() {
		if (this.mainTimer.isRunning()) {
			return;
		}

		this.mainTimerEndClock.pause();
		this.mainTimer.start();
	}

	pause() {
		if (!this.mainTimer.isRunning() || this.breakTimer.isRunning()) {
			return;
		}

		this.mainTimer.pause();

		this.startNewEndClock();
		this.mainTimerEndClock.start();
	}

	takeBreak() {
		if (!this.mainTimer.isRunning() || this.breakTimer.isRunning()) {
			return;
		}

		UiConstants.ELEMENT_NOTIFICATION.addClass("show");

		this.breakTimer.set(this.BREAK_LENGTH_SECONDS);
		this.breakTimer.start();
	}

	cancelBreak() {
		UiConstants.ELEMENT_NOTIFICATION.removeClass("show");
		this.breakTimer.pause();
	}

	abortBreak() {
		if (!this.breakTimer.isRunning()) {
			return;
		}

		this.mainTimer.updateTime(this.breakTimer.getSecondsLeft());
		this.cancelBreak();
		this.pause();
	}

	startNewEndClock() {
		var now = new Date();
		now.setSeconds(now.getSeconds() + this.mainTimer.getSecondsLeft());
		this.mainTimerEndClock.set(now);
		this.mainTimerEndClock.start();
	}

	addSeconds(seconds) {
		if (seconds) {
			this.mainTimer.updateTime(-seconds);
			this.startNewEndClock();
		}
	} 
}