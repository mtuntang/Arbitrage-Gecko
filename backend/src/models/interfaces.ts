export interface Market {
    name: string;
}

export interface Ticker {
    market: Market;
    last: number;
    base: string;
    target: string;
}

export interface FlattenedTicker {
    exchange: string;
    price: number;
    base: string;
    target: string;
}

export interface ArbitrageOpportunity {
    baseCoin: string;
    intermediateCoin: string;
    targetCoin: string;
    exchanges: {
        buyExchange: string;
        sellExchange: string;
        finalSellExchange: string;
    };
    buyPrice: number;
    sellIntermediatePrice: number;
    sellTargetPrice: number;
    profit: number;
}
