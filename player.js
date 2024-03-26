"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(hand, name) {
        if (name === void 0) { name = "Cyborg_".concat(Math.floor(Math.random() * 1000)); }
        //some code
        this.name = name;
        this.hand = hand;
        this.score = 0;
    }
    Object.defineProperty(Player.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "numberOfTilesInHand", {
        get: function () {
            return this.hand.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "Hand", {
        get: function () {
            return this.hand;
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.updateHand = function (tiles) {
        this.hand = tiles;
    };
    Player.prototype.updateScore = function (roundScore) {
        this.score += roundScore;
    };
    Object.defineProperty(Player.prototype, "Score", {
        get: function () {
            return this.score;
        },
        enumerable: false,
        configurable: true
    });
    // remove tile from hand
    Player.prototype.playTile = function (tile) {
        var array = __spreadArray([], this.hand, true);
        // console.log(`${this.name}'s hand (fn):`, { array });
        array = array.filter(function (t) {
            return !(t.left === tile.left && t.right === tile.right) &&
                !(t.left === tile.right && t.right === tile.left);
        });
        if (array.length == this.hand.length)
            throw Error("Tile is not in your hand...STOP HACKING!");
        return array;
    };
    Player.prototype.draw = function (tile) {
        this.hand.push(tile);
    };
    return Player;
}());
exports.Player = Player;
