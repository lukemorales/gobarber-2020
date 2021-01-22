import { PropsWithChildren } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider = ({ children }: PropsWithChildren<unknown>) => (
  <ToastProvider>
    <AuthProvider>{children}</AuthProvider>
  </ToastProvider>
);

export default AppProvider;
