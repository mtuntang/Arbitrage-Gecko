import CoinGeckoService from '../services/coinGeckoService';

// Remove axios mock import
// jest.mock('axios');

describe('CoinGeckoService', () => {
    it('should fetch tickers', async () => {
        const tickers = await CoinGeckoService.fetchTickers('bitcoin');
        expect(tickers.length).toBeGreaterThan(0);
        expect(tickers[0]).toHaveProperty('market');
        expect(tickers[0]).toHaveProperty('last');
        expect(tickers[0]).toHaveProperty('base');
        expect(tickers[0]).toHaveProperty('target');
    });

    it('should fetch limited tickers', async () => {
        const tickers = await CoinGeckoService.fetchLimitedTickers('bitcoin', 1);
        expect(tickers.length).toBe(1);
        expect(tickers[0]).toHaveProperty('market');
        expect(tickers[0]).toHaveProperty('last');
        expect(tickers[0]).toHaveProperty('base');
        expect(tickers[0]).toHaveProperty('target');
    });

    it('should fetch historical data', async () => {
        const historicalData = await CoinGeckoService.fetchHistoricalData('bitcoin', 7);
        expect(historicalData.length).toBeGreaterThan(0);
        expect(historicalData[0].length).toBe(2);
    });
});
