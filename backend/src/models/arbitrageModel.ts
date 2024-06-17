import CoinGeckoService from '../services/coinGeckoService';
import { Ticker, FlattenedTicker} from './interfaces';

const coinIdToSymbol: Record<string, string> = {
  'tether': 'USDT',
  'usd-coin': 'USDC',
  'dai': 'DAI',
  'bitcoin': 'BTC',
  'ethereum': 'ETH'
};

const symbolToCoinId: Record<string, string> = {
  'USDT': 'tether',
  'USDC': 'usd-coin',
  'DAI': 'dai',
  'BTC': 'bitcoin',
  'ETH': 'ethereum'
};


class ArbitrageModel {
  static async calculateArbitrage(coins: string[], stableCoins: string[]): Promise<FlattenedTicker[][]> {
    const intermediaries: Record<string, Ticker[]> = {};
    const bases: Record<string, Ticker[]> = {};

    await Promise.all([...coins].map(async (coin) => {
      intermediaries[coin] = await CoinGeckoService.fetchLimitedTickers(coin, 1000);
    }));

    await Promise.all([...stableCoins].map(async (coin) => {
      bases[coin] = await CoinGeckoService.fetchLimitedTickers(coin, 1000);
    }));

    return this.findArbitrageOpportunities(intermediaries, bases, coins, stableCoins);
  }

  private static findArbitrageOpportunities(intermediaries: Record<string, Ticker[]>, bases: Record<string, Ticker[]>, coins: string[], stableCoins: string[]): FlattenedTicker[][] {
    const arbitrageOpportunities: FlattenedTicker[][] = [];
    const flattenedIntermediaries = this.flattenTickers(intermediaries);
    const flattenedBases = this.flattenTickers(bases);

    stableCoins.forEach(stableCoin => {
      let currentBase = flattenedBases[stableCoin];
      currentBase.forEach(stableCoinTicker => {
        // call generatePaths with a currentPath array filled with the stableCoinTicker in the 0th index
        if (stableCoinTicker.target !== coinIdToSymbol[stableCoin] && coins.includes(symbolToCoinId[stableCoinTicker.target])) {
          this.generatePaths([stableCoinTicker], flattenedBases, flattenedIntermediaries, coins, stableCoins, 1, arbitrageOpportunities)
        }
      })
    })

    return arbitrageOpportunities;
  }

  private static generatePaths(currentPath: FlattenedTicker[], flattenedBases: Record<string, FlattenedTicker[]>, flattenedIntermediaries: Record<string, FlattenedTicker[]>, coins: string[], stableCoins: string[], numIntermediaries: number, arbitrageOpportunities: FlattenedTicker[][]) {
    let totalLength = 2 + numIntermediaries;
    if (currentPath.length === totalLength) {
      //Would check if the current path is profitable before pushing here
      arbitrageOpportunities.push([...currentPath]);
      return;
    }

    if (currentPath.length === totalLength-1) {
      let currentIntermediaryTickers = flattenedIntermediaries[currentPath[currentPath.length-1].base];
      currentIntermediaryTickers.forEach(intermediaryTicker => {
        if (stableCoins.includes(intermediaryTicker.target)) {
          currentPath.push(intermediaryTicker);
          this.generatePaths(currentPath, flattenedBases, flattenedIntermediaries, coins, stableCoins, numIntermediaries, arbitrageOpportunities);
          currentPath.pop();
        }

      });
    }

    coins.forEach(coin => {
      // Check if coin is the same as the coin we are currently at in the path
      if (coin == currentPath[currentPath.length - 1].target) {
        // get the coin ticker array to iterate through
        let currentIntermediaryTickers = flattenedIntermediaries[coin];
        currentIntermediaryTickers.forEach(intermediaryTicker => {
          if (stableCoins.includes(intermediaryTicker.target)) {
            return;
          }
          if (!currentPath.some(ticker => ticker.base === intermediaryTicker.base)) {
            currentPath.push(intermediaryTicker);
            this.generatePaths(currentPath, flattenedBases, flattenedIntermediaries, coins, stableCoins, numIntermediaries, arbitrageOpportunities);
            currentPath.pop();
          }
        })
      }
    })
  }

  private static flattenTickers(marketPrices: Record<string, Ticker[]>): Record<string, FlattenedTicker[]> {
    const flattened: Record<string, FlattenedTicker[]> = {};

    for (const coin in marketPrices) {
      marketPrices[coin].forEach((ticker) => {
        if (!flattened[coin]) flattened[coin] = [];
        flattened[coin].push({
          exchange: ticker.market.name,
          price: ticker.last,
          base: coin,
          target: ticker.target
        });
      });
    }

    return flattened;
  }

  static async getHistoricalData(coin: string, days: number): Promise<[string, number][]> {
    const historicalData = await CoinGeckoService.fetchHistoricalData(coin, days);

    // Convert Unix timestamps to date strings in the format 'YYYY-MM-DD HH:mm:ss'
    // @ts-ignore
    const formattedData = historicalData.map(([timestamp, price]) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return [formattedDate, price];
    });

    return formattedData;
  }



  private static isProfitablePath(path: FlattenedTicker[]): boolean {
    // Placeholder method for profitability check
    // Due to API limitations, this method is not fully implemented
    return true;
  }
}

export default ArbitrageModel;
