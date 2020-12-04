import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { type, onClick, disabled, children } = props;

  return (
    <S.Container type={type} onClick={onClick} disabled={disabled}>
      {children}
    </S.Container>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => null,
} as ButtonProps;

export default Button;
