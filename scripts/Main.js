$(window).on('load', function(){
    var main = new Main();
    main.setEventHandlers();
});

$(window).on("beforeunload", function() {
    return "Are you sure you want leave?";
});

function Main() {
    this.timer = new Timer();
    this.background = new Background();

    this.background.toggleSlideShow(); //turn the slide show on
}

Main.prototype.setEventHandlers = function() {
    var self = this;

    $(".popupHeader").click(function(ev) {
        var id = $(ev.target).data("popupid");
        $(".popupContent[data-popupId=" + id + "]").toggleClass("show");
    });

    $(window).keydown(function(ev) {
        switch (ev.keyCode) {
            case 13: //ENTER
                self.timer.start();
                break;
            case 32: //SPACE
                self.timer.pause();
                break;
        }
    });

    /*
    * Timer event handlers
    */
    $("#startTimer").click(this.timer.start.bind(this.timer));

    $("#pauseTimer").click(this.timer.pause.bind(this.timer));

    $("#resetTimer").click(this.timer.reset.bind(this.timer));

    $("#timerBreakOption").click(this.timer.takeBreak.bind(this.timer));

    $("#cancelBreak").click(this.timer.cancelBreak.bind(this.timer));

    $("#abortBreak").click(this.timer.abortBreak.bind(this.timer));

    $("#submitNewTimer").click(this.timer.set.bind(this.timer));

    $("#addMinutesSubmit").click(function() {
        if (self.timer.isFinished())
            return;
        
        self.timer.subtractFromMainTimer(-60*$("#addMinutes").val());
    });

    /*
    * Background event handlers
    */
    $("#showNextWallpaper").click(this.background.showNextWallpaper.bind(this.background));

    $("#showPrevWallpaper").click(this.background.showPrevWallpaper.bind(this.background));

    $("#setSlideShow").click(this.background.toggleSlideShow.bind(this.background));

    $(".bgMode").click(function(ev) {
        self.background.changeMode(+$(ev.target).data("modeid"));
    });
}