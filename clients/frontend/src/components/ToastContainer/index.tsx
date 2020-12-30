import { PropsWithChildren } from 'react';

import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import * as S from './styles';

type ToastContainerProps = S.ToastProps;

const ToastContainer = ({ type }: PropsWithChildren<ToastContainerProps>) => {
  return (
    <S.Container>
      <S.Toast type={type}>
        <FiAlertCircle size={24} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </S.Toast>
      <S.Toast type="success">
        <FiAlertCircle size={24} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </S.Toast>
      <S.Toast type="error">
        <FiAlertCircle size={24} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </S.Toast>
      <S.Toast type="warning">
        <FiAlertCircle size={24} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </S.Toast>
    </S.Container>
  );
};

ToastContainer.defaultProps = {
  type: 'info',
};

export default ToastContainer;
