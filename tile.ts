export class Tile {
  left: number;
  right: number;
  constructor(left: number, right: number) {
    if (0 > left || 6 < left || 0 > right || 6 < right)
      throw Error("Invalid Parameters");
    this.left = left;
    this.right = right;
  }
}
