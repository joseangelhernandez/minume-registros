import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

const RequireAuth = () => {
    const{ auth } = useAuth();
    const location = useLocation();
    const rutas_dev = ""

    return(
        auth?.usuario
        ? <Outlet />
        : <Navigate to={rutas_dev+"/"}  state={{from: location}} replace/>
    )
}

export default RequireAuth;