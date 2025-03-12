export enum TimeBasedType {
    HUNGER,
    STAMINA,
    AGE,
    NONE
}

export type TimeBasedDictionary = {
    type: TimeBasedType;
    interval: number;
    amount: number;
    minThreshold?: number;
};


export type TimeBasedContextType = {
    getInterval: (type: TimeBasedType) => number | undefined;
    getAmount: (type: TimeBasedType) => number | undefined;
    getMinThreshold: (type: TimeBasedType) => number | undefined;
};