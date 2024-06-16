import { Request, Response } from 'express';
import ArbitrageModel from '../models/arbitrageModel';
import { stableCoins, coins, coinIdToSymbol } from '../utils/coinUtils';

class ArbitrageController {
    static async getArbitrageOpportunities(req: Request, res: Response) {
        try {
            const opportunities = await ArbitrageModel.calculateArbitrage(coins, stableCoins);
            res.json(opportunities);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                // Handle the case where the error is not of type Error
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
}

export default ArbitrageController;
