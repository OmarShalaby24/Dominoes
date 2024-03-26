import { Tile } from "./tile";

export class Player {
  private name: string;
  private hand: Tile[];
  protected score: number;

  constructor(
    hand: Tile[],
    name: string = `Cyborg_${Math.floor(Math.random() * 1000)}`
  ) {
    //some code
    this.name = name;
    this.hand = hand;
    this.score = 0;
  }

  get Name() {
    return this.name;
  }
  get numberOfTilesInHand() {
    return this.hand.length;
  }
  get Hand() {
    return this.hand;
  }
  updateHand(tiles: Tile[]) {
    this.hand = tiles;
  }

  updateScore(roundScore: number) {
    this.score += roundScore;
  }
  get Score() {
    return this.score;
  }
  // remove tile from hand
  playTile(tile: Tile): Tile[] {
    let array = [...this.hand];
    // console.log(`${this.name}'s hand (fn):`, { array });
    array = array.filter(
      (t) =>
        !(t.left === tile.left && t.right === tile.right) &&
        !(t.left === tile.right && t.right === tile.left)
    );
    if (array.length == this.hand.length)
      throw Error("Tile is not in your hand...STOP HACKING!");
    return array;
  }
  draw(tile: Tile) {
    this.hand.push(tile);
  }
}
