import { SlimeStats } from "./SlimeStats";

export type Slime = {
    id: number;
    name: string;
    svg: string;
    size: number;
    colour: string;
    isOnMarket: boolean;
    price: number;
    ownerId: number;
    slimeStats: SlimeStats | undefined;
};

export type MarketSlime = {
    id: number;
    name: string;
    svg: string;
    price: number;
};


export type EditableSlime = {
    id: number;
    name: string;
    isOnMarket: boolean;
    ownerId: number;
}
