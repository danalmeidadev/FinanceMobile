import React, {createContext, ReactNode, useContext} from 'react';

interface AuthProviderProps {
  children: ReactNode,
}

export const AuthContext = createContext([]);

const AuthProvider = ({children}: AuthProviderProps) => {
  return(
    <AuthContext.Provider value={['Dan']}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

export {AuthProvider, useAuth}



