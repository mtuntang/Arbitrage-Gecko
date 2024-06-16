import CoinGeckoService from '../services/coinGeckoService';
import { mockTickers } from '../mocks/mockData';

// Mock axios module
jest.mock('axios');
import axios from 'axios';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CoinGeckoService', () => {
    it('should fetch tickers', async () => {
        mockedAxios.get.mockResolvedValue({ data: { tickers: mockTickers } });

        const tickers = await CoinGeckoService.fetchTickers('bitcoin');
        expect(tickers).toEqual(mockTickers);
    });

    it('should fetch limited tickers', async () => {
        mockedAxios.get.mockResolvedValue({ data: { tickers: mockTickers } });

        const tickers = await CoinGeckoService.fetchLimitedTickers('bitcoin', 1);
        expect(tickers).toEqual(mockTickers.slice(0, 1));
    });

    it('should fetch historical data', async () => {
        const mockHistoricalData = { prices: [[1628812800000, 50000], [1628899200000, 50500]] };
        mockedAxios.get.mockResolvedValue({ data: mockHistoricalData });

        const historicalData = await CoinGeckoService.fetchHistoricalData('bitcoin', 7);
        expect(historicalData).toEqual(mockHistoricalData.prices);
    });
});
