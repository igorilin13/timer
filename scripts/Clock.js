class Clock extends BaseTimeTask {
	constructor(uiElement) {
		super(uiElement);
		this.TIME_LOCALE = "ru";
		this.TIME_FORMAT = {hour: "2-digit", minute: "2-digit", second: "2-digit"};

		this.resetData();
	}

	setNewData(newDate) {
		this.date = newDate;
	}

	resetData() {
		this.date = null;
		this.uiElement.text("--:--:--");
	}

	updateTime(addSeconds) {
		this.date.setSeconds(this.date.getSeconds() + addSeconds);
		this.uiElement.text(this.date.toLocaleString(this.TIME_LOCALE, this.TIME_FORMAT));
	}
}