import api from '~/services/api';
import { composeLocalStorageKey } from '~/utils';
import { AuthData } from '~/contexts/auth/types';

type AuthEndPoints = '/sessions' | '/users';

const handleAuthEndpoint = async <T extends unknown>(
  endpoint: AuthEndPoints,
  credentials: T,
) => {
  const { data } = await api.post<AuthData>(endpoint, credentials);
  const { token, user } = data;

  if (typeof window !== 'undefined') {
    localStorage.setItem(composeLocalStorageKey('token'), token);
    localStorage.setItem(composeLocalStorageKey('user'), JSON.stringify(user));
  }

  api.defaults.headers.Authorization = `Bearer ${token}`;

  return user;
};

export default handleAuthEndpoint;
