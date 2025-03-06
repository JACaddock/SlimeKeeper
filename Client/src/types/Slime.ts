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
    is_on_market: boolean;
    price: number;
    owner_id: number;
};