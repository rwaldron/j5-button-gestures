const five = require("johnny-five");
const Button = require("../lib/");

const board = new five.Board();

board.on("ready", function() {

  const button = new Button(8);

  button.on("tap", () => console.log("tap"));
  button.on("doubletap", () => console.log("doubletap"));
  button.on("longpress", () => console.log("longpress"));

});
