"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.Game = void 0;
var ground_1 = require("./ground");
var player_1 = require("./player");
var tile_1 = require("./tile");
var Game = /** @class */ (function () {
    function Game() {
        //TODO: create Tiles
        this.tiles = new Array(28);
        var k = 0;
        for (var i = 0; i < 7; i++) {
            for (var j = i; j < 7; j++)
                this.tiles[k++] = new tile_1.Tile(i, j);
        }
        // create Ground
        this.ground = new ground_1.Ground();
        // create players
        // give each player his tiles
        var draw = __spreadArray([], this.tiles, true);
        var hand1 = [];
        var hand2 = [];
        for (var i = 0; i < 7; i++) {
            var index = Math.floor(Math.random() * draw.length);
            var tile = draw[index];
            hand1.push(tile);
            draw.splice(index, 1);
            index = Math.floor(Math.random() * draw.length);
            tile = draw[index];
            hand2.push(tile);
            delete draw[index];
            draw.splice(index, 1);
        }
        this.player1 = new player_1.Player(hand1, "Omar");
        this.player2 = new player_1.Player(hand2);
        // put the rest as draw tiles
        this.ground.DrawTiles = draw;
        //FIXME: delete hand1 and hand2 and draw;
        this.turn = this.player1;
        this.startGame();
    }
    Game.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gameEnded, _a, index, side, chosenTile, newHand, winner, loser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        gameEnded = false;
                        _b.label = 1;
                    case 1:
                        if (!!gameEnded) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 3000); })];
                    case 2:
                        _b.sent();
                        console.clear();
                        // console.log(step++);
                        this.showTiles("Ground", this.ground.burntTiles);
                        console.log("Ground: \nLeft:", this.ground.leftSide, " Right:", this.ground.rightSide);
                        // console.log("Ground: ", this.ground.leftSide, this.ground.rightSide);
                        // console.log("Tiles on Ground: ", this.ground.burntTiles);
                        // console.log(`Tiles in ${this.turn.Name}'s hand: `, this.turn.Hand);
                        this.showTiles(this.turn.Name, this.turn.Hand);
                        _a = this.pickTile(), index = _a.index, side = _a.side;
                        console.log(index, side);
                        chosenTile = this.turn.Hand[index];
                        try {
                            newHand = this.turn.playTile(chosenTile);
                            this.ground.addTile(chosenTile, side);
                            this.turn.updateHand(newHand);
                        }
                        catch (e) {
                            return [3 /*break*/, 1];
                        }
                        if (this.didWin(this.turn)) {
                            gameEnded = true;
                            winner = this.turn;
                            this.switchTurn();
                            loser = this.turn;
                            this.endGame(winner, loser);
                            return [2 /*return*/];
                        }
                        this.switchTurn();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.switchTurn = function () {
        if (this.turn.Name === this.player1.Name)
            this.turn = this.player2;
        else
            this.turn = this.player1;
        console.warn("".concat(this.turn.Name, "'s Turn"));
    };
    Game.prototype.didWin = function (player) {
        return player.numberOfTilesInHand === 0 ? true : false;
    };
    Game.prototype.endGame = function (winner, loser) {
        var roundScore = 0;
        for (var i = 0; i < loser.numberOfTilesInHand; i++)
            roundScore += loser.Hand[i].left + loser.Hand[i].right;
        winner.updateScore(roundScore);
    };
    Game.prototype.drawTile = function () {
        var drawTiles = __spreadArray([], this.ground.DrawTiles, true);
        var index = Math.floor(Math.random() * drawTiles.length);
        var tile = drawTiles[index];
        drawTiles.splice(index, 1);
        this.turn.draw(tile);
    };
    Game.prototype.pickTile = function () {
        var rl = require("readline-sync");
        var index = -1;
        var side = null;
        while (index === -1 || side === null) {
            var tileIndex = rl.question("Select Tile index : ");
            var t = parseInt(tileIndex);
            if (t < 0 || t > 6)
                continue;
            index = t;
            console.log(index);
            var position = rl.question("Select Side (L/R): ");
            var p = position.toLowerCase();
            if ("l" === p)
                side = ground_1.Side.Left;
            else if ("r" == p)
                side = ground_1.Side.Right;
            else
                continue;
        }
        return { index: index, side: side };
    };
    Game.prototype.showTiles = function (s, tiles) {
        if (tiles.length === 0)
            return;
        console.log("".concat(s, "'s hand"));
        for (var i = 0; i < tiles.length; i++) {
            process.stdout.write("╔═══╗ ");
        }
        console.log();
        for (var i = 0; i < tiles.length; i++) {
            process.stdout.write("\u2551 ".concat(tiles[i].left, " \u2551 "));
        }
        console.log();
        for (var i = 0; i < tiles.length; i++) {
            process.stdout.write("\u2560\u2550\u2550\u2550\u2563 ");
        }
        console.log();
        for (var i = 0; i < tiles.length; i++) {
            process.stdout.write("\u2551 ".concat(tiles[i].right, " \u2551 "));
        }
        console.log();
        for (var i = 0; i < tiles.length; i++) {
            process.stdout.write("\u255A\u2550\u2550\u2550\u255D ");
        }
        console.log();
        for (var i = 0; i < tiles.length; i++) {
            process.stdout.write("  ".concat(i, "   "));
        }
        console.log();
    };
    return Game;
}());
exports.Game = Game;
