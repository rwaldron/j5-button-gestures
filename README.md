# Gestures Gestures


[![Build Status](https://travis-ci.org/rwaldron/j5-button-gestures.svg?branch=master)](https://travis-ci.org/rwaldron/j5-button-gestures)

For use with [Johnny-Five](https://github.com/rwaldron/johnny-five).


```sh
npm install johnny-five j5-button-gestures
```


```js
const five = require("johnny-five");
const Gestures = require("j5-button-gestures");

const board = new five.Board();

board.on("ready", function() {

  const button = new Gestures(8);

  button.on("tap", () => console.log("tap"));
  button.on("doubletap", () => console.log("doubletap"));
  button.on("longpress", () => console.log("longpress"));

});
```
