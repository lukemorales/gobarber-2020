import { PropsWithChildren } from 'react';

import { AnimatePresence } from 'framer-motion';

import { ToastMessage } from '~/contexts/toast/types';

import * as S from './styles';
import Toast from './Toast';

type ToastContainerProps = {
  messages: Array<ToastMessage>;
};

const ToastContainer = (props: PropsWithChildren<ToastContainerProps>) => {
  const { messages } = props;

  return (
    <S.Container>
      <AnimatePresence>
        {messages.map((message) => (
          <Toast key={message.id} message={message} />
        ))}
      </AnimatePresence>
    </S.Container>
  );
};

ToastContainer.defaultProps = {
  type: 'info',
};

export default ToastContainer;
