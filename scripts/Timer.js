class Timer extends BaseTimeTask {
    constructor(uiElement, onTimerExpiredCallback) {
        super(uiElement);
        this.onTimerExpiredCallback = onTimerExpiredCallback;
        this.totalSeconds = 0;

        this.resetData();
    }

    setNewData(seconds) {
        this.totalSeconds = this.secondsLeft = seconds;
    }

    resetData() {
        this.secondsLeft = this.totalSeconds;
        this.uiElement.text(Utils.toHHMMSS(this.totalSeconds));
    }

    updateTime(secondsElapsed) {
        this.secondsLeft -= secondsElapsed;

        if (this.secondsLeft <= 0) {
            if (this.onTimerExpiredCallback) {
                this.onTimerExpiredCallback();
            }
            this.pause();
            this.secondsLeft = 0;
        }

        this.uiElement.text(Utils.toHHMMSS(this.secondsLeft));
    }

    getSecondsLeft() {
        return this.secondsLeft;
    }
}