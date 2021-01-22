export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type AuthData = {
  token: string;
  user: User;
};

export type AuthContextData = {
  user: User;
  isLoading: boolean;
  handleSignIn: (credentials: SignInCredentials) => Promise<void>;
  handleSignUp: (credentials: SignUpCredentials) => Promise<void>;
  handleSignOut: () => void;
};
