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
            const { coin, days } = req.query;
            console.log('Received query parameters:', { coin, days });

            // Validate query parameters
            if (!coin || !days) {
                return res.status(422).json({ error: 'Missing required parameters' });
            }

            const historicalData = await ArbitrageModel.getHistoricalData(coin as string, parseInt(days as string));
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
