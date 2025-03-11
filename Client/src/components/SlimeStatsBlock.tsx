import { AxiosResponse } from "axios";
import { useAccount } from "../hooks/useAccount";
import { SlimeFeeder, SlimeStats, SlimeTrainer } from "../types/SlimeStats";
import { TrainingType } from "../utils/Enums";
import { getRarity } from "../utils/RarityStringUtil";
import RequestButton from "./RequestButton";
import { TimeBasedType } from "../types/TimeBased";
import useTimer    from "../hooks/useTimer";
import { useState, useEffect } from "react";


interface Props {
    slimeStats: SlimeStats;
    userid: number | undefined;
    ownerid: number;
    slimeid: number;
    setSlimeStats: (slimeStats: SlimeStats) => void;
}

const SlimeStatsBlock = ({ slimeStats, userid, ownerid, slimeid, setSlimeStats }: Props) => {
    const { hasEnoughGold, changeGold } = useAccount();
    const { isReady: staminaIsReady, getFormattedTimeLeft: getStaminaFormattedTimeLeft } = useTimer({
        handleTimerComplete: updateTimeBasedStats,
        timeBasedType: TimeBasedType.STAMINA,
        timePercent: 1 - (slimeStats.stamina - Math.trunc(slimeStats.stamina)),
        constraint: slimeStats.stamina < slimeStats.maxStamina
    });
    const { isReady: hungerIsReady, getFormattedTimeLeft: getHungerFormattedTimeLeft} = useTimer({
        handleTimerComplete: updateTimeBasedStats,
        timeBasedType: TimeBasedType.HUNGER,
        timePercent: (slimeStats.hunger - Math.trunc(slimeStats.hunger)),
        constraint: slimeStats.hunger > 0
    });
    const [updatedSlimeStats, setUpdatedSlimeStats] = useState<SlimeStats>();

    useEffect(() => {
        if (updatedSlimeStats) {
            setSlimeStats(updatedSlimeStats);
            setUpdatedSlimeStats(undefined);
        }

    }, [updatedSlimeStats, setSlimeStats])

    function handleRequestResponse(request: SlimeFeeder | SlimeTrainer, response: AxiosResponse) {
        console.log(request);
        console.log(response.data);
        setSlimeStats(response.data);
        changeGold(-200);
    }

    function updateTimeBasedStats(type: TimeBasedType) {
        switch (type) {
            case TimeBasedType.HUNGER:
                setUpdatedSlimeStats(prev => {
                    if (!prev) {
                        return { ...slimeStats, hunger: Math.ceil(slimeStats.hunger - 1) };
                    }
                    return { ...prev, hunger: Math.ceil(slimeStats.hunger - 1) };
                });
                if (slimeStats.hunger - 1 <= 0) {
                    return false;
                }
                return true;
            case TimeBasedType.STAMINA:
                setUpdatedSlimeStats(prev => {
                    if (!prev) {
                        return { ...slimeStats, stamina: Math.floor(slimeStats.stamina + 1) };
                    }
                    return { ...prev, stamina: Math.floor(slimeStats.stamina + 1) };
                });
                if (slimeStats.stamina + 1 >= slimeStats.maxStamina) {
                    return false;
                }
                return true;
            default:
        }
        return false;
    }


    return (
        <div className="flex-column margin-top-2em">
            <p>{getRarity(slimeStats.rarity)}</p>
            <div className={userid == ownerid ? "stats-block" : ""}>
                <p style={slimeStats.maxHealth >= slimeStats.healthCap ? { color: "red" } : {}}>
                    Health: {Math.trunc(slimeStats.health)} / {slimeStats.maxHealth}
                </p>
                {userid != null && userid == ownerid && slimeStats.maxHealth < slimeStats.healthCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" tooltip={"Train Health\n Cost: 200G & -1 Stamina\n Effect: +200% Health Growth"}
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0 || slimeStats.stamina < 1}
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
                <div className="tooltip-container">
                    <p style={slimeStats.maxStamina >= slimeStats.staminaCap ? { color: "red" } : {}}>
                        Stamina: {Math.trunc(slimeStats.stamina)} / {slimeStats.maxStamina}
                    </p>
                    {staminaIsReady ?
                            <p className="timer-text">[{getStaminaFormattedTimeLeft()}]</p> : <></>
                        }
                </div>
                {userid != null && userid == ownerid && slimeStats.maxStamina < slimeStats.staminaCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" tooltip={"Train Stamina\n Cost: 200G & -1 Stamina\n Effect: +10% Stamina Growth"}
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0 || slimeStats.stamina < 1}
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
                <div className="tooltip-container">
                    <p style={slimeStats.maxHunger >= slimeStats.hungerCap ? { color: "red" } : {}}>
                        Hunger: {Math.ceil(slimeStats.hunger)} / {slimeStats.maxHunger}</p>
                    {hungerIsReady ?
                            <p className="timer-text">[{getHungerFormattedTimeLeft()}]</p> : <></>
                        }
                </div>
                {userid != null && userid == ownerid && slimeStats.maxHunger < slimeStats.hungerCap ?
                    (<><RequestButton
                        className="stats-button"
                        path="/api/user/train/" tooltip={"Train Hunger\n Cost: 200G & -1 Stamina\n Effect: +200% Hunger Growth"}
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0 || slimeStats.stamina < 1}
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
                        path="/api/user/train/" tooltip={"Train Strength\n Cost: 200G & -1 Stamina\n Effect: +20% Strength Growth"}
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0 || slimeStats.stamina < 1}
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
                        path="/api/user/train/" tooltip={"Train Speed\n Cost: 200G & -1 Stamina\n Effect: +20% Speed Growth"}
                        isDisabled={!hasEnoughGold(200) || slimeStats.health <= 0 || slimeStats.stamina < 1}
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
                        className="stats-button extra-padding" text={"Feed"}
                        path="/api/user/feed/" tooltip={"Feed\n Cost: 200G\n Effect: +2 Hunger"}
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