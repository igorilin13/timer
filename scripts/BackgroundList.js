class BackgroundList {
    constructor(modeId, totalBackgrounds, backgroundPathsSource) {
        this.BACKGROUND_FOLDER = 'images/';
        this.BACKGROUND_FORMAT = ".jpg";

        this.modeId = modeId;
        this.totalBackgrounds = totalBackgrounds;
        this.backgroundPaths = [];

        this.resolvePaths(backgroundPathsSource);
        this.shufflePathsList();
    }

    resolvePaths(backgroundPathsSource) {
        if (backgroundPathsSource != null) {
            for (var i = 0; i < backgroundPathsSource.length; i++) {
                if (backgroundPathsSource[i] != null) {
                    this.backgroundPaths = this.backgroundPaths.concat(backgroundPathsSource[i].getPathsList());
                }
            }
        } else {
            for (var i = 0; i < this.totalBackgrounds; i++) {
                this.backgroundPaths[i] = this.BACKGROUND_FOLDER + (this.modeId + 1) + "-" + (i + this.BACKGROUND_FORMAT);
            }
        }
    }

    shufflePathsList() {
        for (var i = this.totalBackgrounds; i > 0; i--) {
            var j = Math.floor(Math.random() * i);
            var item = this.backgroundPaths[i - 1];
            this.backgroundPaths[i - 1] = this.backgroundPaths[j];
            this.backgroundPaths[j] = item;
        }
    }

    getPathByIndex(index) {
        return this.backgroundPaths[index];
    }

    getPathsList() {
        return this.backgroundPaths;
    }
}