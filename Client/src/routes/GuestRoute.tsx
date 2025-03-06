import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = ({ children }: {children: React.ReactNode}) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    return isLoggedIn() ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <>{children}</>
    );
}

export default GuestRoute;