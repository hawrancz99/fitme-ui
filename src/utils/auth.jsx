import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const LOCAL_STORAGE_AUTH_KEY = 'app-auth';

const initialState = {
  token: null,
};

function getStorageState(defaultState) {
  if (!window.localStorage) {
    return defaultState;
  }

  const rawData = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (!rawData) {
    return defaultState;
  }

  try {
    const { token } = JSON.parse(rawData);

    if (token) {
      return { token };
    }
  } catch (error) {
    console.log(error);
  }

  return defaultState;
}

function setStorageState(newState) {
  if (!window.localStorage) {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newState));
}

function createContextValue({ token, setState }) {
  return {
    token,
    signin: ({ token2 }) => setState({ token2 }),
    signout: () => setState({ token: null }),
  };
}

const AuthContext = createContext(
  createContextValue({
    token: initialState.token,
    setState: () => console.error('You are using AuthContext without AuthProvider!'),
  }),
);

function usePersistedAuth(defaultState) {
  const [state, setStateRaw] = useState(() => getStorageState(defaultState));

  const setState = useCallback((newState) => {
    setStateRaw(newState);
    setStorageState(newState);
  }, []);

  return [state, setState];
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [state, setState] = usePersistedAuth(initialState);

  const contextValue = useMemo(() => {
    const { token } = state;
    return createContextValue({ token, setState });
  }, [state, setState]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
