const five = require("johnny-five");

class Button extends five.Button {
  constructor(options = {}) {
    super(options);

    five.Board.Component.call(
      this, options = five.Board.Options(options)
    );

    if (!options.gestures) {
      options.gestures = {};
    }

    if (!options.gestures.tap) {
      options.gestures.tap = {};
    }

    if (!options.gestures.doubletap) {
      options.gestures.doubletap = {};
    }

    if (!options.gestures.longpress) {
      options.gestures.longpress = {};
    }

    if (typeof options.gestures.tap.time === "undefined") {
      options.gestures.tap.time = 125;
    }

    if (typeof options.gestures.doubletap.time === "undefined") {
      options.gestures.doubletap.time = 500;
    }

    if (typeof options.gestures.longpress.time === "undefined") {
      options.gestures.longpress.time = 1000;
    }

    const gestures = {
      tap: {
        // down-up
        down: {
          time: null,
        },
        up: {
          time: null,
        },
        time: options.gestures.tap.time,
      },
      doubletap: {
        // // down-up-down-up
        // down: {
        //   time: null,
        // },
        // up: {
        //   time: null,
        // },
        time: options.gestures.doubletap.time,
        timeout: null,
        // isActive: false,
      },
      longpress: {
        down: {
          time: null,
        },
        time: options.gestures.longpress.time,
        timeout: null,
        isActive: false,
        isPendingRelease: false,
      },
    };


    this.on("tap", () => {
      if (!gestures.doubletap.timeout) {
        gestures.doubletap.timeout = setTimeout(() => {
          clearTimeout(gestures.doubletap.timeout);
          gestures.doubletap.timeout = null;
        }, gestures.doubletap.time);
      } else {
        this.emit("doubletap");
        clearTimeout(gestures.doubletap.timeout);
        gestures.doubletap.timeout = null;
      }
    });

    this.on("down", () => {
      let now = Date.now();

      gestures.tap.down.time = now;

      if (!gestures.longpress.isActive &&
          !gestures.longpress.isPendingRelease) {
        gestures.longpress.isActive = true;
        gestures.longpress.down.time = now;

        gestures.longpress.timeout = setTimeout(() => {
          clearTimeout(gestures.longpress.timeout);
          this.emit("longpress");
          gestures.longpress.isActive = false;
          gestures.longpress.isPendingRelease = true;
        }, gestures.longpress.time);
      }

      if (gestures.longpress.isPendingRelease) {
        gestures.longpress.isPendingRelease = false;
      }
    });

    this.on("up", () => {
      let now = Date.now();
      let tapDelta = now - gestures.tap.down.time;

      if (tapDelta <= gestures.tap.time) {
        this.emit("tap");
      }

      gestures.tap.down.time = null;

      let longpressDelta = now - gestures.longpress.down.time;

      if (longpressDelta < gestures.longpress.time) {
        clearTimeout(gestures.longpress.timeout);
        gestures.longpress.isActive = false
        gestures.longpress.isPendingRelease = false;
      }

      if (!gestures.longpress.isActive &&
          gestures.longpress.isPendingRelease) {
        gestures.longpress.isPendingRelease = false;
      }
    });




  }
}

module.exports = Button;
