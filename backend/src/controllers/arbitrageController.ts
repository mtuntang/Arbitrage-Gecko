import { Request, Response } from 'express';
import ArbitrageModel from '../models/arbitrageModel';

class ArbitrageController {
    static async getArbitrageOpportunities(req: Request, res: Response) {
        try {
            const stableCoins = ['tether', 'usd-coin'];
            const coins = ['bitcoin', 'ethereum'];
            const opportunities = await ArbitrageModel.calculateArbitrage(coins, stableCoins);
            res.json(opportunities);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async getHistoricalData(req: Request, res: Response) {
        try {
            const { coins, days } = req.body;
            const historicalData = await ArbitrageModel.getHistoricalData(coins, days);
            res.json(historicalData);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
}

export default ArbitrageController;
