import { Slime } from './Slime.ts';

export type User = {
    id: number;
    username: string;
    email: string;
    is_verified: boolean;
    first_name: string;
    last_name: string;
    is_admin: boolean;
    money: number;
    slimes: Slime[];
};

export type UserCredentials = {
    username: string;
    email: string;
    password: string;
}