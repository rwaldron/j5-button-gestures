const five = require("johnny-five");
const Button = require("../lib/")(five);

const board = new five.Board();

board.on("ready", function() {

  const button = new Button(8);


  button.on("down", () => console.log("down"));
  button.on("up", () => console.log("up"));
  button.on("hold", () => console.log("hold"));

});
