function Timer() {
    this.BREAK_LENGTH = 10*60; //(seconds). default break length is 10 minutes

    this.running = false; //is the (main) timer running
    this.isTakingBreak = false; //if true, timer continues to run but it will stop in BREAK_LENGTH seconds

    this.totalSeconds = 8*60*60; //Default: 8 hours
    this.totalSecondsLeft = this.totalSeconds;
    this.breakSecondsLeft = 0;

    this.mainTimerId = 0; //interval id of the timer itself
    this.endTimerId = 0; //end timer shows when the main timer would run out if you started it right now
    this.breakTimerId = 0;

    this.endTime; //Holds Date() object = when the clock will run out.

    /*html elements: */

    this.clockContainerElement = $("#timeLeftContainer");
    this.endTimeElement = $("#endTime");
    this.totalTimeElement = $("#totalTime");
    this.notificationElement = $("#timerNotification");
    this.breakTimeElement = $("#breakTimeLeft");

    //set new timer form (inputs)
    this.newHoursElement = $("#newTimerHours");
    this.newMinutesElement = $("#newTimerMinutes");
    this.newSecondsElement = $("#newTimerSeconds");
}

Timer.prototype.start = function() {
    var self = this;

    if (this.totalSecondsLeft == 0 || this.running) {
        return;
    }

    //stop updating the end timer if it's running
    if (this.endTimerId) {
        clearInterval(this.endTimerId);
    }

    //set end time
    this.endTime = new Date(new Date().getTime() + 1000*this.totalSecondsLeft);
    this.endTimeElement.text(this.endTime.toLocaleString("ru", {hour: "2-digit", minute: "2-digit", second: "2-digit"}));

    //start the timer
    this.running = true;
    this.subtractFromMainTimer(1);
    this.mainTimerId = setInterval(this.subtractFromMainTimer.bind(this, 1), 1000);
}

Timer.prototype.pause = function() {
    if (!this.running)
        return;

    var self = this;

    clearInterval(this.mainTimerId);

    this.running = false;
    this.isTakingBreak = false;

    this.endTime = new Date(new Date().getTime() + 1000*this.totalSecondsLeft);

    updateEndTimer();
    this.endTimerId = setInterval(updateEndTimer, 1000);

    function updateEndTimer() {
        self.endTime.setSeconds(self.endTime.getSeconds() + 1);
        self.endTimeElement.text(self.endTime.toLocaleString("ru", {hour: "2-digit", minute: "2-digit", second: "2-digit"}));
    }
}

Timer.prototype.set = function() {
    var hours = +this.newHoursElement.val();
    var minutes = +this.newMinutesElement.val();
    var seconds = +this.newSecondsElement.val();

    var self = this;

    if (hours >= 0 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
        this.totalSeconds = this.totalSecondsLeft = hours*60*60 + minutes*60 + seconds;
        this.totalTimeElement.text("Total: " + this.toHHMMSS(this.totalSeconds));
        this.reset();
    } else {
        var tmp = this.notificationElement.text();
        this.notificationElement.text("Incorrect data!");
        this.notificationElement.addClass("show");
        setTimeout(function() {
            self.notificationElement.removeClass("show");
            self.notificationElement.text(tmp);
        }, 3000);
    }
}

Timer.prototype.reset = function() {
    this.running = false;
    this.totalSecondsLeft = this.totalSeconds;

    clearInterval(this.mainTimerId);
    clearInterval(this.endTimerId);
    clearInterval(this.breakTimerId);
    this.notificationElement.removeClass("show");

    if (this.clockContainerElement.hasClass("timerFinished")) {
        this.clockContainerElement.removeClass("timerFinished");
    }

    this.endTimeElement.text("--:--:--");
    this.clockContainerElement.text(this.toHHMMSS(this.totalSeconds));
}

Timer.prototype.takeBreak = function() {
    if (!this.running || this.isTakingBreak)
        return;

    var self = this;

    this.notificationElement.addClass("show");

    this.isTakingBreak = true;
    this.breakSecondsLeft = this.BREAK_LENGTH;

    updateBreakTimer();
    this.breakTimerId = setInterval(updateBreakTimer, 1000);

    function updateBreakTimer() {
        self.breakSecondsLeft--;

        self.breakTimeElement.text(self.breakSecondsLeft);

        if (self.breakSecondsLeft <= 0) {
            clearInterval(self.breakTimerId);
            self.notificationElement.removeClass("show");
            self.pause.apply(self);
        }
    }
}

Timer.prototype.cancelBreak = function() {
    if (this.isTakingBreak == false)
        return;

    this.notificationElement.removeClass("show");

    this.isTakingBreak = false;
    this.breakSecondsLeft = 0;

    clearInterval(this.breakTimerId);
}

Timer.prototype.abortBreak = function() {
    if (this.isTakingBreak == false)
        return;

    this.subtractFromMainTimer(this.breakSecondsLeft);
    this.cancelBreak();
    this.pause();
}

//subtracts n seconds from the timer clock
Timer.prototype.subtractFromMainTimer = function(n) {
    this.totalSecondsLeft -= n;

    if (this.totalSecondsLeft <= 0) {
        clearInterval(this.mainTimerId);
        if (this.isTakingBreak) {
            this.cancelBreak();
        }

        this.totalSecondsLeft = 0;
        this.running = false;
        this.clockContainerElement.addClass("timerFinished");
    }

    if (Math.abs(n) > 1) {
        this.endTime = new Date(new Date().getTime() + 1000*this.totalSecondsLeft);
        this.endTimeElement.text(this.endTime.toLocaleString("ru", {hour: "2-digit", minute: "2-digit", second: "2-digit"}));

        this.totalSeconds -= n;
        this.totalTimeElement.text("Total: " + this.toHHMMSS(this.totalSeconds));
    }

    this.clockContainerElement.text(this.toHHMMSS(this.totalSecondsLeft));
}

Timer.prototype.toHHMMSS = function(n) {
    var hours = Math.floor(n/3600);
    var minutes = Math.floor((n - (hours*3600))/60);
    var seconds = n - (hours*3600) - (minutes*60);

    if (hours < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}

    return hours + ':' + minutes + ':' + seconds;
}

Timer.prototype.isRunning = function() {
    return this.running;
}

Timer.prototype.isFinished = function() {
    return this.totalSecondsLeft == 0;
}