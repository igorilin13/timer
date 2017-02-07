function Background() {
    /* supports 2 separate sets of wallpapers
    the third mode is both sets combined */
    this.TOTAL_MODES = 3;
    this.SLIDESHOW_LENGTH = 60*60*1000; //1 hour
    this.BG_FOLDER_URL = 'images/'; //relative to index.html

    this.numberOfBgs = [3, 0, 0]; //number of backgrounds by background modes. //TODO

    this.bgNames = []; //two-dimensional. separate lists for each modes.
    //background name: mode-number.jpg. Example: 1-13.jpg

    this.currentMode = 0;
    this.currentBgIndex = new Array(this.TOTAL_MODES).fill(0);

    this.slideshowId = -13;

    //generate background names
    for (var i = 0; i < this.TOTAL_MODES; i++) {
        this.bgNames[i] = [];
        for (var j = 0; j < this.numberOfBgs[i]; j++)
            this.bgNames[i][j] = (i + 1) + "-" + (j + ".jpg");
    }

    this.bgNames[2] = this.bgNames[0].concat(this.bgNames[1]);

    this.shuffleBgLists();

    this.setCurrentBackground();
}

Background.prototype.showNextWallpaper = function() {
    this.currentBgIndex[this.currentMode]++;

    if (this.currentBgIndex[this.currentMode] >= this.numberOfBgs[this.currentMode]) {
        this.currentBgIndex[this.currentMode] = 0;
    }

    this.setCurrentBackground();
}

Background.prototype.showPrevWallpaper = function() {
    this.currentBgIndex[this.currentMode]--;

    if (this.currentBgIndex[this.currentMode] < 0) {
        this.currentBgIndex[this.currentMode] = this.numberOfBgs[this.currentMode] - 1;
    }

    this.setCurrentBackground();
}

Background.prototype.changeMode = function(newMode) {
    if (newMode == this.currentMode)
        return;

    $("[data-modeId=" + this.currentMode + "]").removeClass("selectedOption");
    $("[data-modeId=" + newMode + "]").addClass("selectedOption");

    this.currentMode = newMode;
    this.setCurrentBackground();
}

Background.prototype.toggleSlideShow = function() {
    if (this.slideshowId < 0) {
        this.slideshowId = setInterval(this.showNextWallpaper.bind(this), this.SLIDESHOW_LENGTH);
        $("#setSlideShow").addClass("selectedOption");
    } else {
        clearInterval(this.slideshowId);
        this.slideshowId = -13;
        $("#setSlideShow").removeClass("selectedOption");
    }
}

Background.prototype.shuffleBgLists = function() {
    for (var i = 0; i < this.TOTAL_MODES; i++) {
        shuffle(this.bgNames[i]);
    }

    //Shuffles array in place.
    function shuffle(a) {
        var j, x, i;
        for (var i = a.length; i > 0; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
}

Background.prototype.setCurrentBackground = function() {
    var mode = this.currentMode;
    $(document.body).css("background-image", "url('" + this.BG_FOLDER_URL + this.bgNames[mode][this.currentBgIndex[mode]] + "')");
}