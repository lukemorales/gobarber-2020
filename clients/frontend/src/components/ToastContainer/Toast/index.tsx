import { ReactElement } from 'react';
import { useEffect } from 'react';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiXCircle,
} from 'react-icons/fi';

import useToasts from '~/contexts/toast';
import { ToastMessage, ToastType } from '~/contexts/toast/types';

import * as S from './styles';

type ToastProps = {
  message: ToastMessage;
};

type ToastIcons = {
  [K in ToastType]: ReactElement;
};

const toastIcons: ToastIcons = {
  error: <FiAlertCircle size={24} />,
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  warning: <FiAlertTriangle size={24} />,
};

const Toast = ({ message }: ToastProps) => {
  const { id, type, title, description } = message;

  const { removeToast } = useToasts();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 5000);

    return () => clearTimeout(timer);
  }, [removeToast, id]);

  return (
    <S.Container
      key={id}
      type={type}
      layout="position"
      initial={{ x: 364, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{
        x: 364,
        opacity: 0,
        transition: { type: 'spring', duration: 0.45 },
      }}
      transition={{ type: 'spring', duration: 0.6 }}
    >
      {toastIcons[type]}

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </S.Container>
  );
};

export default Toast;
