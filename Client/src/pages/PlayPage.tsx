import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useAccount } from "../hooks/useAccount";
import SlimeStatsBlock from "../components/SlimeStatsBlock";
import { useEffect, useState } from "react";
import SplicingMenu from "../components/SplicingMenu";
import { Slime } from "../types/Slime";


const PlayPage = () => {
    const navigate = useNavigate();
    const { getGold, updateSlime, getSlimes } = useAccount();
    const { user } = useAuth();
    const [loaded, setLoaded] = useState(false);
    const [isSplicing, setIsSplicing] = useState(false);
    const [slimesToSplice, setSlimesToSplice] = useState<Slime[]>([]);

    useEffect(() => {
        if (!loaded) {
            getSlimes(true);
            setLoaded(true);
        }
    }, [getSlimes, loaded])

    function addSlimeToSplice(slime: Slime) {
        if (!slimesToSplice.includes(slime)) {
            setSlimesToSplice([...slimesToSplice, slime])
        }
    }

    function removeSlimeToSplice(slime: Slime) {
        if (slimesToSplice.includes(slime)) {
            setSlimesToSplice([...slimesToSplice.filter(s => s != slime)])
        }
    }

    function toggleSpliceMenu(bool: boolean) {
        setIsSplicing(bool)
        if (!bool) setSlimesToSplice([]);
    }


    return (
        <main>
            <p>You have {getGold()} gold {getGold() > 1000 ? ("...You should spend some!"): ("...Better save up some more...")}</p>
            <div className="flex">
                {getSlimes().map((slime) => {
                    return (
                        <div key={slime.id}>
                            <div onClick={() => {
                                if (!isSplicing) navigate("/slime/" + slime.id);
                                else addSlimeToSplice(slime);
                            }} 
                                key={slime.id} className="market-item image-wrapper"
                            >
                                {parse(slime.svg)}
                            </div>
                            <p>{slime.name}</p>
                            {!isSplicing && slime.slimeStats
                                ? (<SlimeStatsBlock
                                    slimeStats={slime.slimeStats} isOnMarket={slime.isOnMarket}
                                    ownerid={slime.ownerId} userid={user?.id} slimeid={slime.id}
                                    setSlimeStats={(slimeStats) => {
                                        updateSlime(slime.id, {
                                            ...slime, slimeStats: slimeStats,
                                            price: ((((100 + (slimeStats.maxHealth + slimeStats.maxHunger)) * slimeStats.strength)
                                                * slimeStats.speed) * slimeStats.maxStamina) * (slimeStats.rarity + 1)
                                        })
                                    }}
                                />)
                                : (<></>)
                            }
                        </div>
                    )
                })}
            </div>
            <SplicingMenu setIsSplicing={toggleSpliceMenu} slimes={slimesToSplice} removeSlime={removeSlimeToSplice} />
        </main>
  );
}

export default PlayPage;