import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContextAdmin";

export const ProtectedRoute = ({ }) => {
    const {user, isAuthenticated} = useAuth();

    if (!isAuthenticated && !user) {
        return <Navigate to='/' replace />;
    }

    return (
        <Outlet/>
    )

    // if(!isAuthenticated) return <Navigate to='/'/>
    // if (!isAllowed) {
    //     return <Navigate to={redirectTo} replace />;
    // }

    // return children ? children : <Outlet />;
};
