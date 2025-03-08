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
    slimeStats: SlimeStats | undefined;
};


export type SlimeStats = {
    id: number;
    health: number;
    maxHealth: number;
    stamina: number;
    maxStamina: number;
    hunger: number;
    maxHunger: number;
    strength: number;
    speed: number;
    rarity: Rarity;
};

enum Rarity {
    COMMON,     // White
    UNCOMMON,   // Grey
    SPECIAL,    // Blue
    RARE,       // Green
    EXOTIC,     // Purple
    LEGENDARY,  // Yellow
    MYTHIC,     // Orange
    GODLIKE     // Red
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
    ownerId: -1,
    slimeStats: undefined
}