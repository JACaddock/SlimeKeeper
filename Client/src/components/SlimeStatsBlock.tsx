import { AxiosResponse } from "axios";
import { useAccount } from "../hooks/useAccount";
import { SlimeStats } from "../types/SlimeStats";
import { TrainingType } from "../utils/Enums";
import { getRarity } from "../utils/RarityStringUtil";
import RequestButton from "./RequestButton";


interface Props {
    slimeStats: SlimeStats;
    userid: number | undefined;
    ownerid: number;
    slimeid: number;
    setSlimeStats: (slimeStats: SlimeStats) => void;
}

const SlimeStatsBlock = ({ slimeStats, userid, ownerid, slimeid, setSlimeStats }: Props) => {
    const { hasEnoughGold, changeGold } = useAccount();

    function handleRequestResponse(response: AxiosResponse) {
        setSlimeStats(response.data);
        changeGold(-200);
    }


    return (
        <div className="flex-column margin-top-2em">
            <p>{getRarity(slimeStats.rarity)}</p>
            <div className={userid == ownerid ? "stats-block" : ""}>
                <p style={slimeStats.maxHealth >= slimeStats.healthCap ? { color: "red" } : {}}>
                    Health: {slimeStats.health} / {slimeStats.maxHealth}
                </p>
                {userid != null && userid == ownerid && slimeStats.maxHealth < slimeStats.healthCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" text="- 200G / 1 Stamina"
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0}
                        sendResponse={handleRequestResponse}
                        request={{
                            training: TrainingType.HEALTH, cost: 200,
                            slimeid: slimeid, ownerid: userid,
                        }}
                    />
                        <p className="text-start">{Math.trunc(slimeStats.healthTraining * 100)}%</p>
                    </>)
                    : <></>}
            </div>
            <div className={userid == ownerid ? "stats-block" : ""}>
                <p style={slimeStats.maxStamina >= slimeStats.staminaCap ? { color: "red" } : {}}>
                    Stamina: {slimeStats.stamina} / {slimeStats.maxStamina}
                </p>
                {userid != null && userid == ownerid && slimeStats.maxStamina < slimeStats.staminaCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" text="- 200G / 1 Stamina"
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0}
                        sendResponse={handleRequestResponse}
                        request={{
                            training: TrainingType.STAMINA, cost: 200,
                            slimeid: slimeid, ownerid: userid,
                        }}
                    />
                        <p className="text-start">{Math.trunc(slimeStats.staminaTraining * 100)}%</p>
                    </>)
                    : <></>}
            </div>
            <div className={userid == ownerid ? "stats-block" : ""}>
                <p style={slimeStats.maxHunger >= slimeStats.hungerCap ? { color: "red" } : {}}>
                    Hunger: {slimeStats.hunger} / {slimeStats.maxHunger}
                </p>
                {userid != null && userid == ownerid && slimeStats.maxHunger < slimeStats.hungerCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" text="- 200G / 1 Stamina"
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0}
                        sendResponse={handleRequestResponse}
                        request={{
                            training: TrainingType.HUNGER, cost: 200,
                            slimeid: slimeid, ownerid: userid,
                        }}
                    />
                        <p className="text-start">{Math.trunc(slimeStats.hungerTraining * 100)}%</p>
                    </>)
                    : <></>}
            </div>
            <div className={userid == ownerid ? "stats-block" : ""}>
                <p style={slimeStats.strength >= slimeStats.strengthCap ? { color: "red" } : {}}>
                    Strength: {slimeStats.strength}
                </p>
                {userid != null && userid == ownerid && slimeStats.strength < slimeStats.strengthCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" text="- 200G / 1 Stamina"
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0}
                        sendResponse={handleRequestResponse}
                        request={{
                            training: TrainingType.STRENGTH, cost: 200,
                            slimeid: slimeid, ownerid: userid,
                        }}
                    />
                        <p className="text-start">{Math.trunc(slimeStats.strengthTraining * 100)}%</p>
                    </>)
                    : <></>}
            </div>
            <div className={userid == ownerid ? "stats-block" : ""}>
                <p style={slimeStats.speed >= slimeStats.speedCap ? { color: "red" } : {}}>
                    Speed: {slimeStats.speed}
                </p>
                {userid != null && userid == ownerid && slimeStats.speed < slimeStats.speedCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" text="- 200G / 1 Stamina"
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0}
                        sendResponse={handleRequestResponse}
                        request={{
                            training: TrainingType.SPEED, cost: 200,
                            slimeid: slimeid, ownerid: userid,
                        }}
                    />
                        <p className="text-start">{Math.trunc(slimeStats.speedTraining * 100)}%</p>
                    </>)
                    : <></>}
            </div>
            {userid != null && userid == ownerid ?
                (<div>
                    <RequestButton
                        className="stats-button extra-padding"
                        path="/api/user/feed/" text="Feed - 200G / + 2 Hunger"
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0}
                        sendResponse={handleRequestResponse}
                        request={{ food: 2, cost: 200, slimeid: slimeid, ownerid: userid }}
                    />
                </div>)
                : <></>
            }
        </div>
    )
}

export default SlimeStatsBlock;