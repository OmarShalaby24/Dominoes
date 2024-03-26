// import { Ground } from "./ground";
import { Player } from "./player";
import { Tile } from "./tile";
import { Game } from "./game";

// function contains(array: Tile[], tile: Tile): boolean {
//   const t = array.filter(
//     (t) =>
//       (t.left === tile.left && t.right === tile.right) ||
//       (t.left === tile.right && t.right === tile.left)
//   );
//   return t.length !== 0 ? true : false;
// }

const game = new Game();
game.startGame();
