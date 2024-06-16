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
const axios_1 = __importDefault(require("axios"));
class CoinGeckoService {
    static fetchTickers(coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://api.coingecko.com/api/v3/coins/${coin}/tickers`);
            return response.data.tickers;
        });
    }
    static fetchHistoricalData(coin, days) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: 7,
                    interval: 'daily',
                    precision: 2
                }
            });
            return response.data.prices;
        });
    }
    static fetchLimitedTickers(coin_1) {
        return __awaiter(this, arguments, void 0, function* (coin, limit = 10) {
            const tickers = yield this.fetchTickers(coin);
            return tickers.slice(0, limit);
        });
    }
}
exports.default = CoinGeckoService;
