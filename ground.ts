import { Tile } from "./tile";

export class Ground {
  leftSide: number;
  rightSide: number;
  burntTiles: Tile[] = [];
  private drawTiles: Tile[];
  constructor() {
    this.leftSide = this.rightSide;
  }

  set DrawTiles(drawTiles: Tile[]) {
    this.drawTiles = drawTiles;
  }

  get DrawTiles() {
    return this.drawTiles;
  }

  get numberOfDrawTiles() {
    return this.DrawTiles.length;
  }

  //TODO:
  // hasValidTile(left: number, right: number): boolean {
  // }
  checkValid(tile: Tile, side: Side = Side.Left) {}

  addTile(tile: Tile, side: Side | null): void {
    if (side === null) side = Side.Left;
    if (this.leftSide === this.rightSide && this.burntTiles.length === 0) {
      console.log("first Tile");
      this.leftSide = tile.left;
      this.rightSide = tile.right;
      this.burntTiles.push(tile);
      return;
    }
    let error = true;
    if (side === Side.Left) {
      if (tile.left === this.leftSide) {
        this.leftSide = tile.right;
        error = false;
      } else if (tile.right === this.leftSide) {
        this.leftSide = tile.left;
        error = false;
      } else error = true;
    } else if (side === Side.Right) {
      if (tile.right === this.rightSide) {
        this.rightSide = tile.left;
        error = false;
      } else if (tile.left === this.rightSide) {
        this.rightSide = tile.right;
        error = false;
      } else error = true;
    }
    if (error) throw Error("Invalid Tile...STOP HACKING!");
    this.burntTiles.push(tile);
  }
}

export enum Side {
  Left = "leftSide",
  Right = "rightSide",
}
