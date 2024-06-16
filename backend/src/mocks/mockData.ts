// __mocks__/mockData.ts
import { Ticker } from '../models/interfaces';

export const mockTickers: Ticker[] = [
    // USDT to BTC
    {
        market: { name: 'Binance' },
        last: 0.00002, // 1 USDT = 0.00002 BTC (buy)
        base: 'USDT',
        target: 'BTC',
    },
    {
        market: { name: 'Kraken' },
        last: 0.000021, // 1 USDT = 0.000021 BTC (sell)
        base: 'USDT',
        target: 'BTC',
    },
    // BTC to ETH
    {
        market: { name: 'Binance' },
        last: 15, // 1 BTC = 15 ETH (buy)
        base: 'BTC',
        target: 'ETH',
    },
    {
        market: { name: 'Kraken' },
        last: 16, // 1 BTC = 16 ETH (sell)
        base: 'BTC',
        target: 'ETH',
    },
    // ETH to USDT
    {
        market: { name: 'Binance' },
        last: 2300, // 1 ETH = 2300 USDT (sell)
        base: 'ETH',
        target: 'USDT',
    },
    {
        market: { name: 'Kraken' },
        last: 2400, // 1 ETH = 2400 USDT (buy)
        base: 'ETH',
        target: 'USDT',
    },
];
