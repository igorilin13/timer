class BaseTimeTask {
    constructor(uiElement) {
        this.uiElement = uiElement;
        this.running = false;
        this.timerId = null;
    }

    set(newData) {
        this.reset();
        this.setNewData(newData);
        this.updateTime(0);
    }

    reset() {
        this.pause();
        this.resetData();
    }

    start() {
        if (this.running) {
            return;
        }

        this.running = true;
        this.timerId = setInterval(this.updateTime.bind(this, 1), 1000);
    }

    pause() {
        if (!this.running) {
            return;
        }

        this.running = false;
        clearInterval(this.timerId);
    }

    isRunning() {
        return this.running;
    }

    setNewData() {
        throw new Error("Cannot call an abstract method");
    }

    resetData() {
        throw new Error("Cannot call an abstract method");
    }

    updateTime(diff) {
        throw new Error("Cannot call an abstract method");
    }
}