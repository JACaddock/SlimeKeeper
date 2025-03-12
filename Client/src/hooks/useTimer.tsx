import { useState, useEffect, useRef } from "react";
import { TimeBasedType } from "../types/TimeBased";
import { useTimeBasedSettings } from "./useTimeBasedSettings";

interface Props {
    handleTimerComplete: (type: TimeBasedType) => boolean;
    timeBasedType: TimeBasedType;
    timePercent: number;
    constraint: boolean;
}

const useTimer = ({ handleTimerComplete, timeBasedType, timePercent, constraint }: Props) => {
    const [timeLeft, setTimeLeft] = useState<number>(timePercent);
    const handleTimerCompleteRef = useRef(handleTimerComplete);
    const { getTimeBasedSetting } = useTimeBasedSettings();
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        handleTimerCompleteRef.current = handleTimerComplete;
    }, [handleTimerComplete]);


    useEffect(() => {
        if (!constraint) {
            setIsReady(false);
            return;
        }

        const timeBasedSetting = getTimeBasedSetting(timeBasedType);
        if (!timeBasedSetting) return;

        const timeUntilNextUpdate = Math.floor(timeBasedSetting * timePercent);
        

        // Update countdown every second
        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (!isReady) {
                    setIsReady(true)
                    return timeUntilNextUpdate;
                }
                if (prevTime && prevTime > 0) {
                    return prevTime - 1;
                }
                if (!handleTimerCompleteRef.current(timeBasedType)) {
                    clearInterval(interval);
                }
                return timeBasedSetting;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [getTimeBasedSetting, timeBasedType, timePercent, isReady, constraint]);


    const getIntTimeLeft = (): number => timeLeft;

    const getFormattedTimeLeft = (): string => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${String(minutes).padStart(2, "0")}:${String(Math.trunc(seconds)).padStart(2, "0")}`;
    };

    return { getIntTimeLeft, getFormattedTimeLeft, isReady };
};

export default useTimer;

