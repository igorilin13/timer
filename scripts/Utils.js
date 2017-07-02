class Utils {
	static get INCORRECT_INPUT_NOTIFICATION_TEXT() {
		return "Incorrect data!";
	}

	static toHHMMSS(seconds) {
		var hh = Math.floor(seconds / 3600);
		var mm = Math.floor((seconds - (hh * 3600)) / 60);
		var ss = seconds - (hh * 3600) - (mm * 60);

		return (hh < 10 ? "0" + hh : hh) + ':' + (mm < 10 ? "0" + mm : mm) + ':' + (ss < 10 ? "0" + ss : ss);
	}

	static showIncorrectInputNotification() {
		var prevText = UiConstants.ELEMENT_NOTIFICATION.text();
		UiConstants.ELEMENT_NOTIFICATION.text(Utils.INCORRECT_INPUT_NOTIFICATION_TEXT);
		UiConstants.ELEMENT_NOTIFICATION.addClass(UiConstants.CLASS_SHOW);

		setTimeout(function() {
			UiConstants.ELEMENT_NOTIFICATION.removeClass(UiConstants.CLASS_SHOW);
			UiConstants.ELEMENT_NOTIFICATION.text(prevText);
		}, 3000);
	}
}