import { useEffect, useState } from "react";
import axios from "axios";
import { TimeBasedType, TimeBasedDictionary } from "../types/TimeBased";
import { TimeBasedContext } from "../hooks/useTimeBasedSettings";


const TimeBasedProvider = ({ children }: { children: React.ReactNode }) => {
    const [timeBasedSettings, setTimeBasedSettings] = useState<TimeBasedDictionary[]>([]);

    useEffect(() => {
        if (timeBasedSettings.length === 0) {
            const settingsStorage = localStorage.getItem("timeBasedSettings");
            if (settingsStorage) {
                setTimeBasedSettings(JSON.parse(settingsStorage));
            }
            axios.get("/api/settings/")
                .then((response) => {
                    const staminaAmount = response.data.staminaRegenAmount;
                    const staminaInterval = response.data.staminaRegenIntervalHours * 60 * 60;
                    const hungerAmount = response.data.hungerDepletionAmount;
                    const hungerInterval = response.data.hungerDepletionIntervalHours * 60 * 60;
                    const hungerMinThreshold = response.data.hungerDepletionMinThreshold;
                    const ageInterval = response.data.ageIncreaseIntervalHours * 60 * 60;
                    const ageAmount = response.data.ageIncreaseAmount;

                    const settings: TimeBasedDictionary[] = [
                        { type: TimeBasedType.STAMINA, interval: staminaInterval, amount: staminaAmount },
                        { type: TimeBasedType.HUNGER, interval: hungerInterval, amount: hungerAmount, minThreshold: hungerMinThreshold },
                        { type: TimeBasedType.AGE, interval: ageInterval, amount: ageAmount}
                    ];

                    if (settings != timeBasedSettings) {
                        localStorage.setItem("timeBasedSettings", JSON.stringify(settings));
                        setTimeBasedSettings(settings);
                    }
                })   
        }
    }, [timeBasedSettings]);


    const getInterval = (type: TimeBasedType) => {
        return timeBasedSettings.find(t => t.type === type)?.interval;
    }

    const getAmount = (type: TimeBasedType) => {
        return timeBasedSettings.find(t => t.type === type)?.amount;
    }

    const getMinThreshold = (type: TimeBasedType) => {
        return timeBasedSettings.find(t => t.type === type)?.minThreshold;
    }


    return (
        <TimeBasedContext.Provider
            value={{ getInterval, getAmount, getMinThreshold }}
        >
            {children}
        </TimeBasedContext.Provider>
    );
}

export default TimeBasedProvider;