export type MarketSlime = {
    id: number;
    name: string;
    svg: string;
    price: number;
};

export type Slime = {
    id: number;
    name: string;
    svg: string;
    size: number;
    colour: string;
    age: number;
    isOnMarket: boolean;
    price: number;
    ownerId: number;
};