import React, {createContext, ReactNode, useContext, useState} from 'react';
import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
  children: ReactNode,
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
interface AuthContextData {
 user: User;
 signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const dataUser = {
  id: '48902840932',
  name: 'Dan Almeida',
  email: 'devdanalmeida@gmail.com'
}

export const AuthContext = createContext({} as AuthContextData);
const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState({} as User);
  async function signInWithGoogle(){
    try { 
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const {params, type} =  await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
      if(type === 'success'){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.family_name,
          photo: userInfo.picture,
        });
        console.log(userInfo)
      }

    } catch (error) {
      throw new Error(error);      
    }
  }

  return(
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

export {AuthProvider, useAuth}



