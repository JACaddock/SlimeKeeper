import { User, UserAccount } from "../types/User";
import { slimeDefault } from "./SlimeDefault";

const slimes = Array.from({ length: 3 }, (_, i) => ({ ...slimeDefault, id: i }));

export const userDefault: User = {
    id: 0,
    username: "Blank007",
    email: "blank@blank.com",
    is_verified: false,
    first_name: "Blanky",
    last_name: "Blank",
    gold: 1000,
    slimes: slimes,
    is_admin: false
}

export const userAccountDefault: UserAccount = {
    id: 0,
    username: "Blank007",
    gold: 1000,
    slimes: slimes,
    friends: [],
    is_admin: false
}