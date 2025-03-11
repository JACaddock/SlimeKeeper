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
                    const stamina = response.data.staminaRegenIntervalMinutes * 60; //60
                    const hunger = response.data.hungerDepletionIntervalMinutes * 60; //60
                    const age = response.data.ageIncreaseIntervalMinutes * 60;

                    const settings = [
                        { timeBasedType: TimeBasedType.STAMINA, timeBasedSetting: stamina },
                        { timeBasedType: TimeBasedType.HUNGER, timeBasedSetting: hunger },
                        { timeBasedType: TimeBasedType.AGE, timeBasedSetting: age}
                    ];

                    if (settings != timeBasedSettings) {
                        localStorage.setItem("timeBasedSettings", JSON.stringify(settings));
                        setTimeBasedSettings(settings);
                    }
                })   
        }
    }, [timeBasedSettings]);


    const getTimeBasedSetting = (type: TimeBasedType) => {
        return timeBasedSettings.find(t => t.timeBasedType === type)?.timeBasedSetting;
    }

    return (
        <TimeBasedContext.Provider
            value={{ getTimeBasedSetting }}
        >
            {children}
        </TimeBasedContext.Provider>
    );
}

export default TimeBasedProvider;