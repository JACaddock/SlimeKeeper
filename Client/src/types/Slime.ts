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

export type EditableSlime = {
    id: number;
    name: string;
    isOnMarket: boolean;
    ownerId: number;
}

export const UndefinedSlime: Slime = {
    id: -1,
    name: "",
    svg: "",
    size: -1,
    colour: "",
    age: -1,
    isOnMarket: false,
    price: -1,
    ownerId: -1
}