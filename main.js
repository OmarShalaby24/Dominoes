"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./game");
// function contains(array: Tile[], tile: Tile): boolean {
//   const t = array.filter(
//     (t) =>
//       (t.left === tile.left && t.right === tile.right) ||
//       (t.left === tile.right && t.right === tile.left)
//   );
//   return t.length !== 0 ? true : false;
// }
var game = new game_1.Game();
game.startGame();
