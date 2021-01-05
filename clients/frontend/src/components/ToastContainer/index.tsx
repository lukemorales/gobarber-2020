import { PropsWithChildren } from 'react';

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
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </S.Container>
  );
};

ToastContainer.defaultProps = {
  type: 'info',
};

export default ToastContainer;
