import { createContext, useState } from "react";
import Cookies from 'universal-cookie';


const AuthContext = createContext({}); // Crear context

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(''); // Crear estado
  const cookies = new Cookies();

  if(auth.token != undefined){
    cookies.set('TaHjtwSe', auth.token, {path: '/'});
  }
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;