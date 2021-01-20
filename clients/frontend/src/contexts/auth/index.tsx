import {
  createContext,
  useContext,
  PropsWithChildren,
  useCallback,
  useState,
  useMemo,
} from 'react';

import api from '~/services/api';
import { composeLocalStorageKey } from '~/utils';

import { handleAuthEndpoint } from './helpers';
import { AuthContextData, User } from './types';
import useToasts from '../toast';

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { addToast } = useToasts();

  const [user, setUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(composeLocalStorageKey('token'));
      const userData = localStorage.getItem(composeLocalStorageKey('user'));

      if (token && userData) {
        return JSON.parse(userData);
      }
    }

    return {} as User;
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn: AuthContextData['handleSignIn'] = useCallback(
    async (credentials) => {
      try {
        setIsLoading(true);
        const userData = await handleAuthEndpoint('/sessions', credentials);

        setUser(userData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Não foi possível autenticar, tente novamente.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  const handleSignUp: AuthContextData['handleSignUp'] = useCallback(
    async (credentials) => {
      try {
        setIsLoading(true);
        const userData = await handleAuthEndpoint('/users', credentials);

        setUser(userData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        addToast({
          type: 'error',
          title: 'Erro na criação de uma nova conta',
          description:
            'Não foi possível criar um novo usuário, tente novamente.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  const handleSignOut: AuthContextData['handleSignOut'] = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(composeLocalStorageKey('token'));
      localStorage.removeItem(composeLocalStorageKey('user'));
    }

    setUser({} as User);

    api.defaults.headers.Authorization = null;
  }, []);

  const value = useMemo<AuthContextData>(
    () => ({
      user,
      isLoading,
      handleSignIn,
      handleSignOut,
      handleSignUp,
    }),
    [handleSignIn, isLoading, user, handleSignOut, handleSignUp],
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
