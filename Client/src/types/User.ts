import { Slime } from './Slime.ts';

export type User = {
    id: number;
    username: string;
    email: string;
    is_verified: boolean;
    first_name: string;
    last_name: string;
    is_admin: boolean;
    gold: number;
    slimes: Slime[];
};

export type UserAccount = {
    id: number;
    username: string;
    is_admin: boolean;
    gold: number;
    slimes: Slime[];
    friends: number[];
};

export type UserAccountContext = {
    hasEnoughGold: (amount: number) => boolean;
    changeGold: (amount: number) => void;
    isAFriend: (id: number) => boolean;
    getGold: () => number;
    isAdmin: () => boolean;
    addSlime: (slime: Slime) => void;
    updateSlime: (slimeId: number, slime: Slime) => void;
    getSlimes: () => Slime[];
    getFriends: () => number[];
};

export type UserCredentials = {
    id: number | null;
    username: string | null;
    email: string | null;
    password: string;
};

export type UserUnique = {
    id: number;
    username: string;
    email: string;
};

export type UserAuth = {
    user: UserUnique | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    isUserValid: () => void;
};

