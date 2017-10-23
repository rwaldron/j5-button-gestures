const Board = require("board-io");

class IO extends Board {
  constructor(options = {
    quiet: true
  }) {
    super(options);


    this._pins.push({
      supportedModes: [0, 1],
      mode: -1,
      report: 0,
      analogChannel: 0x7f
    }, {
      supportedModes: [0, 1],
      mode: -1,
      report: 0,
      analogChannel: 0x7f
    }, {
      supportedModes: [0, 1],
      mode: -1,
      report: 0,
      analogChannel: 0x7f
    }, {
      supportedModes: [0, 1],
      mode: -1,
      report: 0,
      analogChannel: 0x7f
    }, {
      supportedModes: [0, 1],
      mode: -1,
      report: 0,
      analogChannel: 0x7f
    }, {
      supportedModes: [0, 1],
      mode: -1,
      report: 0,
      analogChannel: 0x7f
    });

    process.nextTick(() => {
      this.emit("connect");
      this.emit("ready");
    });
  }

  digitalRead() {

  }
}

module.exports = IO;
