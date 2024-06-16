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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coinGeckoService_1 = __importDefault(require("../services/coinGeckoService"));
class ArbitrageModel {
    static calculateArbitrage(coins, stableCoins) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketPrices = {};
            yield Promise.all([...coins, ...stableCoins].map((coin) => __awaiter(this, void 0, void 0, function* () {
                marketPrices[coin] = yield coinGeckoService_1.default.fetchLimitedTickers(coin, 10);
            })));
            const bestPrices = {};
            Object.keys(marketPrices).forEach(coin => {
                bestPrices[coin] = {
                    sell: Math.max(...marketPrices[coin].map((ticker) => ticker.last)),
                    buy: Math.min(...marketPrices[coin].map((ticker) => ticker.last))
                };
            });
            // Implement your logic to find arbitrage opportunities here
            return bestPrices; // Example return, modify as needed
        });
    }
}
exports.default = ArbitrageModel;
