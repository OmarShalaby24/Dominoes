"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
var Tile = /** @class */ (function () {
    function Tile(left, right) {
        if (0 > left || 6 < left || 0 > right || 6 < right)
            throw Error("Invalid Parameters");
        this.left = left;
        this.right = right;
    }
    return Tile;
}());
exports.Tile = Tile;
