import { createContext, useContext } from "react";
import { TimeBasedContextType } from "../types/TimeBased";

export const TimeBasedContext = createContext<TimeBasedContextType>({} as TimeBasedContextType);

export const useTimeBasedSettings = () => useContext(TimeBasedContext);