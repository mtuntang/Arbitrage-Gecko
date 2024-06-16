import ArbitrageModel from '../models/arbitrageModel';
import CoinGeckoService from '../services/coinGeckoService';
import { FlattenedTicker } from '../models/interfaces';
import { stableCoins, coins } from '../utils/coinUtils';

describe('ArbitrageModel', () => {
    it('should calculate arbitrage opportunities', async () => {
        const opportunities: FlattenedTicker[][] = await ArbitrageModel.calculateArbitrage(coins, stableCoins);

        expect(opportunities).toBeDefined();
        expect(opportunities.length).toBeGreaterThan(0);
    });
});
