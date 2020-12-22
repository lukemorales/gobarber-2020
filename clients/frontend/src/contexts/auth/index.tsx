import { useCallback } from 'react';
import { useMemo } from 'react';
import { createContext, useContext, PropsWithChildren } from 'react';
import { useState } from 'react';

import { AuthContextData, AuthData, User } from './types';

import api from '~/services/api';
import { getLocalStorageKey } from '~/utils';

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(getLocalStorageKey('token'));
      const client = localStorage.getItem(getLocalStorageKey('user'));

      if (token && client) {
        return JSON.parse(client);
      }
    }

    return {} as User;
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn: AuthContextData['handleSignIn'] = useCallback(
    async (credentials) => {
      try {
        setIsLoading(true);
        const { data } = await api.post<AuthData>('sessions', credentials);

        if (typeof window !== 'undefined') {
          localStorage.setItem(getLocalStorageKey('token'), data.token);
          localStorage.setItem(
            getLocalStorageKey('user'),
            JSON.stringify(data.user),
          );
        }

        api.defaults.headers.Authorization = `Bearer ${data.token}`;

        setUser(data.user);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleSignOut: AuthContextData['handleSignOut'] = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(getLocalStorageKey('token'));
      localStorage.removeItem(getLocalStorageKey('user'));
    }

    setUser({} as User);

    api.defaults.headers.Authorization = null;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      handleSignIn,
      handleSignOut,
    }),
    [handleSignIn, isLoading, user, handleSignOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;
