import {
  createContext,
  useContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { nanoid } from 'nanoid';

import ToastContainer from '~/components/ToastContainer';

import { ToastContextData, ToastMessage } from './types';

const ToastContext = createContext({} as ToastContextData);

export const ToastProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [messages, setMessages] = useState<Array<ToastMessage>>([]);

  const addToast = useCallback<ToastContextData['addToast']>((message) => {
    const id = nanoid();

    const toast: ToastMessage = {
      id,
      ...message,
    };

    setMessages((prevState) => [...prevState, toast]);
  }, []);

  const removeToast = useCallback<ToastContextData['removeToast']>(
    (id) =>
      setMessages((prevState) =>
        prevState.filter((message) => message.id !== id),
      ),
    [],
  );

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
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToasts = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
};

export default useToasts;
