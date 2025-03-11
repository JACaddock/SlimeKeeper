export enum TimeBasedType {
    HUNGER,
    STAMINA,
    AGE,
    NONE
}

export type TimeBasedDictionary = {
    timeBasedType: TimeBasedType;
    timeBasedSetting: number;
};

export type TimeBasedContextType = {
    getTimeBasedSetting: (type: TimeBasedType) => number | undefined;
}