import { Rarity } from "../utils/Enums";
import { SlimeStats } from "./SlimeStats";

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
    isOnMarket: boolean;
    price: number;
    ownerId: number;
    slimeStats: SlimeStats | undefined;
};

export type EditableSlime = {
    id: number;
    name: string;
    isOnMarket: boolean;
    ownerId: number;
}

export const UndefinedSlime: Slime = {
    id: -1,
    name: "-------",
    svg: (`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100px" height="100px" viewBox="-10 -5 31 21" >
                <circle id="body" cx = "5" cy="5" r="5" fill="#30aa49" stroke="#000000" stroke- width="0.2" > </circle>
                <circle id="iris1" cx="3" cy="4" r="1" fill="#000000" stroke="none"></circle >
                <circle id="iris2" cx = "7" cy = "4" r = "1" fill = "#000000" stroke = "none" ></circle>
           </svg >`),
    size: 0,
    colour: "green",
    isOnMarket: false,
    price: 100,
    ownerId: -1,
    slimeStats: {
        id: -1,
        age: 0,
        health: 10,
        maxHealth: 10,
        healthCap: 20,
        healthTraining: 0,
        stamina: 1,
        maxStamina: 1,
        staminaCap: 2,
        staminaTraining: 0,
        hunger: 10,
        maxHunger: 10,
        hungerCap: 20,
        hungerTraining: 0,
        strength: 1,
        strengthCap: 2,
        strengthTraining: 0,
        speed: 1,
        speedCap: 2,
        speedTraining: 0,
        rarity: Rarity.COMMON,
        lastUpdated: "" 
    }
}