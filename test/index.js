const sinon = require("sinon");
const Button = require("../lib/");
const five = require("johnny-five");
const IO = require("./io");

exports["Subclass of five.Button"] = {
  setUp(done) {
    done();
  },
  tearDown(done) {
    done();
  },
  subclass(test) {
    test.expect(1);
    test.equal(Object.getPrototypeOf(Button), five.Button);
    test.done();
  }
};

exports["Tap: down-up"] = {
  setUp(done) {
    this.sandbox = sinon.sandbox.create();
    this.digitalRead = this.sandbox.spy(IO.prototype, "digitalRead");

    this.io = new IO();
    this.board = new five.Board({
      repl: false,
      debug: false,
      io: this.io,
    });
    this.board.on("ready", done);
  },
  tearDown(done) {
    this.sandbox.restore();
    done();
  },

  default (test) {
    test.expect(1);

    const time = 125;
    const button = new Button({
      pin: 8,
      board: this.board
    });

    const callback = this.digitalRead.args[0][1];

    button.on("tap", () => {
      test.equal(1, 1);
      test.done();
    });

    // Set initial state
    callback(button.upValue);

    button.emit("down");

    setTimeout(() => {
      button.emit("up");
    }, time - 10);
  },

  custom(test) {
    test.expect(1);

    const time = 200;
    const button = new Button({
      pin: 8,
      board: this.board,
      gestures: {
        tap: {
          time
        }
      }
    });

    const callback = this.digitalRead.args[0][1];

    button.on("tap", () => {
      test.equal(1, 1);
      test.done();
    });

    // Set initial state
    callback(button.upValue);

    button.emit("down");
    button.emit("down");
    button.emit("down");
    button.emit("down");
    button.emit("down");

    setTimeout(() => {
      button.emit("up");
      button.emit("up");
      button.emit("up");
      button.emit("up");
      button.emit("up");
    }, time - 10);
  },
};

exports["Doubletap: down-up-down-up"] = {
  setUp(done) {
    this.sandbox = sinon.sandbox.create();
    this.digitalRead = this.sandbox.spy(IO.prototype, "digitalRead");

    this.io = new IO();
    this.board = new five.Board({
      repl: false,
      debug: false,
      io: this.io,
    });
    this.board.on("ready", done);
  },
  tearDown(done) {
    this.sandbox.restore();
    done();
  },

  default (test) {
    test.expect(1);

    const time = 125;
    const button = new Button({
      pin: 8,
      board: this.board
    });

    const callback = this.digitalRead.args[0][1];

    button.on("doubletap", () => {
      test.equal(1, 1);
      test.done();
    });

    // Set initial state
    callback(button.upValue);

    button.emit("down");
    button.emit("down");
    button.emit("down");
    button.emit("down");
    button.emit("down");

    setTimeout(() => {
      button.emit("up");
      button.emit("up");
      button.emit("up");
      button.emit("up");
      button.emit("up");

      setTimeout(() => {
        button.emit("down");
        button.emit("down");
        button.emit("down");
        button.emit("down");
        button.emit("down");

        setTimeout(() => {
          button.emit("up");
          button.emit("up");
          button.emit("up");
          button.emit("up");
          button.emit("up");
        }, time - 10);
      }, time - 10);
    }, time - 10);
  },
};

exports["Longpress: down-hold (no repeat)"] = {
  setUp(done) {
    this.sandbox = sinon.sandbox.create();
    this.digitalRead = this.sandbox.spy(IO.prototype, "digitalRead");

    this.io = new IO();
    this.board = new five.Board({
      repl: false,
      debug: false,
      io: this.io,
    });
    this.board.on("ready", done);
  },
  tearDown(done) {
    this.sandbox.restore();
    done();
  },

  default (test) {
    test.expect(1);

    const time = 1000;
    const button = new Button({
      pin: 8,
      board: this.board
    });

    const callback = this.digitalRead.args[0][1];

    button.on("longpress", () => {
      test.equal(1, 1);
      test.done();
    });

    // Set initial state
    callback(button.upValue);

    button.emit("down");
    button.emit("down");
    button.emit("down");
    button.emit("down");
    button.emit("down");

    setTimeout(() => {
      button.emit("down");
      button.emit("down");
      button.emit("down");
      button.emit("down");
      button.emit("down");
    }, time + 1);
  },
};
