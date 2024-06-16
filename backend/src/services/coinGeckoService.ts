import axios from 'axios';
import { Ticker } from '../models/interfaces';

class CoinGeckoService {
  static async fetchTickers(coin: string): Promise<Ticker[]> {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/tickers`, {
      params: {
        page: 1,
        order: 'trust_score_desc'
      }
    });

    // Map the response data to match the Ticker interface
    return response.data.tickers.map((ticker: any) => ({
      market: { name: ticker.market.name },
      last: ticker.last,
      base: ticker.base,
      target: ticker.target,
    }));
  }

  static async fetchHistoricalData(coin: string, days: number) {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
        interval: 'daily',
        precision: 2
      }
    });
    return response.data.prices;
  }

  static async fetchLimitedTickers(coin: string, limit: number = 10): Promise<Ticker[]> {
    const tickers = await this.fetchTickers(coin);
    return tickers.slice(0, limit);
  }
}

export default CoinGeckoService;
