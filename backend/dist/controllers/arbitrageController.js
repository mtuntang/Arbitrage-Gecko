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
const arbitrageModel_1 = __importDefault(require("../models/arbitrageModel"));
class ArbitrageController {
    static getArbitrageOpportunities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stableCoins = ['tether', 'usd-coin'];
                const coins = ['bitcoin', 'ethereum'];
                const opportunities = yield arbitrageModel_1.default.calculateArbitrage(coins, stableCoins);
                res.json(opportunities);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    // Handle the case where the error is not of type Error
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.default = ArbitrageController;
