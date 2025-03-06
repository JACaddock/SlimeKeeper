import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute;