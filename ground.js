"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Side = exports.Ground = void 0;
var Ground = /** @class */ (function () {
    function Ground() {
        this.burntTiles = [];
        this.leftSide = this.rightSide;
    }
    Object.defineProperty(Ground.prototype, "DrawTiles", {
        get: function () {
            return this.drawTiles;
        },
        set: function (drawTiles) {
            this.drawTiles = drawTiles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ground.prototype, "numberOfDrawTiles", {
        get: function () {
            return this.DrawTiles.length;
        },
        enumerable: false,
        configurable: true
    });
    //TODO:
    // hasValidTile(left: number, right: number): boolean {
    // }
    Ground.prototype.checkValid = function (tile, side) {
        if (side === void 0) { side = Side.Left; }
    };
    Ground.prototype.addTile = function (tile, side) {
        if (side === null)
            side = Side.Left;
        if (this.leftSide === this.rightSide && this.burntTiles.length === 0) {
            console.log("first Tile");
            this.leftSide = tile.left;
            this.rightSide = tile.right;
            this.burntTiles.push(tile);
            return;
        }
        var error = true;
        if (side === Side.Left) {
            if (tile.left === this.leftSide) {
                this.leftSide = tile.right;
                error = false;
            }
            else if (tile.right === this.leftSide) {
                this.leftSide = tile.left;
                error = false;
            }
            else
                error = true;
        }
        else if (side === Side.Right) {
            if (tile.right === this.rightSide) {
                this.rightSide = tile.left;
                error = false;
            }
            else if (tile.left === this.rightSide) {
                this.rightSide = tile.right;
                error = false;
            }
            else
                error = true;
        }
        if (error)
            throw Error("Invalid Tile...STOP HACKING!");
        this.burntTiles.push(tile);
    };
    return Ground;
}());
exports.Ground = Ground;
var Side;
(function (Side) {
    Side["Left"] = "leftSide";
    Side["Right"] = "rightSide";
})(Side || (exports.Side = Side = {}));
