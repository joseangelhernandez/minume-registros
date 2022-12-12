import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import useRefreshToken from "hooks/useRefreshToken";
import logoCarga from "assets/images/pantallaCarga/Logo-minume-carga.gif";

const PersistLogin = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const verificarRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }

        !auth?.token ? verificarRefreshToken() : setLoading(false);
        
    }, []);

    return(
        <>
            {loading 
                ? <img src={logoCarga} alt="loading..." style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', maxWidth: '40%', maxHeight: '40%'}}/>
                : <Outlet />            
            }
        </>
    )
}

export default PersistLogin;