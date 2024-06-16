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