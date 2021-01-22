import { DefaultTheme } from 'styled-components';

export type ToastContextData = {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
};

export type ToastType = keyof DefaultTheme['colors']['toasts'];

export type ToastMessage = {
  id: string;
  type: ToastType;
  title: string;
  description: string;
};
