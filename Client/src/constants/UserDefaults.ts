import { User, UserAccount } from "../types/User";
import { slimeDefault } from "./SlimeDefault";

const slimes = Array.from({ length: 3 }, (_, i) => ({ ...slimeDefault, id: i }));

export const userDefault: User = {
    id: 0,
    username: "....................",
    email: "",
    is_verified: false,
    first_name: "",
    last_name: "",
    gold: 0,
    slimes: slimes,
    isAdmin: false
}

export const userAccountDefault: UserAccount = {
    id: 0,
    username: "....................",
    gold: 0,
    slimes: slimes,
    friends: [],
    isAdmin: false
}