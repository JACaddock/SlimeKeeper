import { useState, useEffect } from "react";

function useDetectDevice() {
    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMiniture = width <= 430;
    const isMobile = width <= 800;
    const isTablet = width <= 1300;

    return { isMiniture, isMobile, isTablet }
}

export default useDetectDevice;