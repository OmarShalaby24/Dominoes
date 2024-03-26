import { Ground, Side } from "./ground";
import { Player } from "./player";
import { Tile } from "./tile";

export class Game {
  tiles: Tile[];
  player1: Player;
  player2: Player;
  ground: Ground;
  turn: Player;
  constructor() {
    //TODO: create Tiles
    this.tiles = new Array(28);
    let k = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) this.tiles[k++] = new Tile(i, j);
    }
    // create Ground
    this.ground = new Ground();
    // create players
    // give each player his tiles
    const draw = [...this.tiles];
    let hand1: Tile[] = [];
    let hand2: Tile[] = [];

    for (let i = 0; i < 7; i++) {
      let index = Math.floor(Math.random() * draw.length);
      var tile = draw[index];
      hand1.push(tile);
      draw.splice(index, 1);
      index = Math.floor(Math.random() * draw.length);
      tile = draw[index];
      hand2.push(tile);
      delete draw[index];
      draw.splice(index, 1);
    }
    this.player1 = new Player(hand1, "Omar");
    this.player2 = new Player(hand2);
    // put the rest as draw tiles
    this.ground.DrawTiles = draw;
    //FIXME: delete hand1 and hand2 and draw;
    this.turn = this.player1;
    this.startGame();
  }

  async startGame() {
    var gameEnded: boolean = false;
    // var step = 0;
    while (!gameEnded) {
      await new Promise((r) => setTimeout(r, 3000));
      console.clear();
      // console.log(step++);
      this.showTiles("Ground", this.ground.burntTiles);
      console.log(
        "Ground: \nLeft:",
        this.ground.leftSide,
        " Right:",
        this.ground.rightSide
      );
      // console.log("Ground: ", this.ground.leftSide, this.ground.rightSide);
      // console.log("Tiles on Ground: ", this.ground.burntTiles);
      // console.log(`Tiles in ${this.turn.Name}'s hand: `, this.turn.Hand);
      this.showTiles(this.turn.Name, this.turn.Hand);
      const { index, side } = this.pickTile();
      console.log(index, side);
      const chosenTile = this.turn.Hand[index];
      try {
        //FIXME: make it transaction
        const newHand = this.turn.playTile(chosenTile);
        this.ground.addTile(chosenTile, side);
        this.turn.updateHand(newHand);
      } catch (e) {
        continue;
      }
      if (this.didWin(this.turn)) {
        gameEnded = true;
        const winner = this.turn;
        this.switchTurn();
        const loser = this.turn;
        this.endGame(winner, loser);
        return;
      }
      this.switchTurn();
    }
  }
  switchTurn() {
    if (this.turn.Name === this.player1.Name) this.turn = this.player2;
    else this.turn = this.player1;
    console.warn(`${this.turn.Name}'s Turn`);
  }

  didWin(player: Player): boolean {
    return player.numberOfTilesInHand === 0 ? true : false;
  }

  endGame(winner: Player, loser: Player) {
    let roundScore = 0;
    for (var i = 0; i < loser.numberOfTilesInHand; i++)
      roundScore += loser.Hand[i].left + loser.Hand[i].right;

    winner.updateScore(roundScore);
  }
  drawTile() {
    const drawTiles = [...this.ground.DrawTiles];
    const index = Math.floor(Math.random() * drawTiles.length);
    const tile = drawTiles[index];
    drawTiles.splice(index, 1);
    this.turn.draw(tile);
  }

  pickTile() {
    const rl = require("readline-sync");
    var index: number = -1;
    var side: Side | null = null;

    while (index === -1 || side === null) {
      var tileIndex = rl.question("Select Tile index : ");
      var t = parseInt(tileIndex);
      if (t < 0 || t > 6) continue;
      index = t;
      console.log(index);

      var position = rl.question("Select Side (L/R): ");
      var p = position.toLowerCase();

      if ("l" === p) side = Side.Left;
      else if ("r" == p) side = Side.Right;
      else continue;
    }
    return { index, side };
  }

  showTiles(s: string, tiles: Tile[]) {
    if (tiles.length === 0) return;
    console.log(`${s}'s hand`);
    for (var i = 0; i < tiles.length; i++) {
      process.stdout.write("╔═══╗ ");
    }
    console.log();
    for (var i = 0; i < tiles.length; i++) {
      process.stdout.write(`║ ${tiles[i].left} ║ `);
    }
    console.log();
    for (var i = 0; i < tiles.length; i++) {
      process.stdout.write(`╠═══╣ `);
    }
    console.log();
    for (var i = 0; i < tiles.length; i++) {
      process.stdout.write(`║ ${tiles[i].right} ║ `);
    }
    console.log();
    for (var i = 0; i < tiles.length; i++) {
      process.stdout.write(`╚═══╝ `);
    }
    console.log();
    for (var i = 0; i < tiles.length; i++) {
      process.stdout.write(`  ${i}   `);
    }
    console.log();
  }
}
