import { Rarity, TrainingType } from "../utils/Enums";

export type SlimeStats = {
    id: number;
    age: number;
    health: number;
    maxHealth: number;
    healthCap: number;
    healthTraining: number;
    stamina: number;
    maxStamina: number;
    staminaCap: number;
    staminaTraining: number;
    hunger: number;
    maxHunger: number;
    hungerCap: number;
    hungerTraining: number;
    strength: number;
    strengthCap: number;
    strengthTraining: number;
    speed: number;
    speedCap: number;
    speedTraining: number;
    rarity: Rarity;
    lastUpdated: string;
};

export type SlimeFeeder = {
    food: number;
    cost: number;
    slimeid: number;
    ownerid: number;
};


export type SlimeTrainer = {
    training: TrainingType;
    intensity?: number;
    cost: number;
    slimeid: number;
    ownerid: number;
};
