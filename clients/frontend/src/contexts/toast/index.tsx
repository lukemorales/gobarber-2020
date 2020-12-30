import {
  createContext,
  useContext,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';

import { ToastContextData } from './types';

import ToastContainer from '~/components/ToastContainer';

const ToastContext = createContext({} as ToastContextData);

export const ToastProvider = ({ children }: PropsWithChildren<unknown>) => {
  const addToast = useCallback(() => {
    console.log('adding toasts');
  }, []);
  const removeToast = useCallback(() => {
    console.log('removing toasts');
  }, []);

  const value = useMemo<ToastContextData>(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
};

export default useToast;
