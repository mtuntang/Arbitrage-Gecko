import CoinGeckoService from '../services/coinGeckoService';
import { Ticker, FlattenedTicker, ArbitrageOpportunity } from './interfaces';

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
      // this.generatePaths(flattenedBases, flattenedIntermediaries, coins, stableCoins, 2, arbitrageOpportunities)
    })

    return arbitrageOpportunities;
  }

  private static generatePaths(currentPath: FlattenedTicker[], flattenedBases: Record<string, FlattenedTicker[]>, flattenedIntermediaries: Record<string, FlattenedTicker[]>, coins: string[], stableCoins: string[], numIntermediaries: number, arbitrageOpportunities: FlattenedTicker[][]) {
    let totalLength = 2 + numIntermediaries;
    if (currentPath.length === totalLength) {
      //check if path is profitable, add to arbitrageOpportunities if yes, return if not
      arbitrageOpportunities.push([...currentPath]);
      return;
    }

    if (currentPath.length === totalLength-1) {
      let currIntermediaryId = currentPath[currentPath.length - 1].base;
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

  static async getHistoricalData(coins: string[], days: number): Promise<Record<string, number[][]>> {
    const historicalData: Record<string, number[][]> = {};

    await Promise.all(coins.map(async (coin) => {
      historicalData[coin] = await CoinGeckoService.fetchHistoricalData(coin, days);
    }));

    return historicalData;
  }

  private static isProfitablePath(path: FlattenedTicker[]): boolean {
    // Placeholder method for profitability check
    // Due to API limitations, this method is not fully implemented
    return true;
  }
}

export default ArbitrageModel;
