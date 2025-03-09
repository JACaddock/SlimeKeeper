import { Rarity } from "../types/Slime";

export function getRarity(rarity: Rarity) {
    switch (rarity) {
        case Rarity.COMMON:
            return "Common";

        case Rarity.UNCOMMON:
            return "Uncommon";

        case Rarity.SPECIAL:
            return "Special";

        case Rarity.RARE:
            return "Rare";

        case Rarity.EXOTIC:
            return "Exotic";

        case Rarity.LEGENDARY:
            return "Legendary";

        case Rarity.MYTHIC:
            return "Mythic";

        case Rarity.GODLIKE:
            return "Godlike";
        default:
            return "Common";
    }
}