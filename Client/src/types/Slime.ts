import { SlimeStats } from "./SlimeStats";

export type Slime = {
    id: number;
    name: string;
    svg: string;
    size: number;
    color: string;
    isOnMarket: boolean;
    price: number;
    ownerId: number;
    ownerName: string;
    slimeStats: SlimeStats | undefined;
};

export type MarketSlime = {
    id: number;
    name: string;
    svg: string;
    price: number;
    ownerId: number;
    ownerName: string;
};


export type SlimeEditable = {
    id: number;
    name: string;
    isOnMarket: boolean;
    ownerId: number;
    ownerName: string;
}
