import { useReducer, createContext, useContext } from 'react';

function authTokenReducer(currentAuthData, action) {
  let token;
  if (action.type === 'login') {
    token = action.token;
    localStorage.setItem('token', token);
  } else if (action.type === 'logout') {
    localStorage.removeItem('token');
  }
  return token;
}

export const AuthTokenContext = createContext(null);
export const AuthTokenDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const initialToken = localStorage.getItem('token');
  const [auth, dispatch] = useReducer(authTokenReducer, initialToken);

  return (
    <AuthTokenContext.Provider value={auth}>
      <AuthTokenDispatchContext.Provider value={dispatch}>
        {children}
      </AuthTokenDispatchContext.Provider>
    </AuthTokenContext.Provider>
  );
}

export function useAuthToken() {
  return useContext(AuthTokenContext);
}

export function useAuthTokenDispatch() {
  return useContext(AuthTokenDispatchContext);
}
