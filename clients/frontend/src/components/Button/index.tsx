import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { MotionProps } from 'framer-motion';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { type, onClick, disabled, children, ...rest } = props;

  return (
    <S.Container type={type} onClick={onClick} disabled={disabled} {...rest}>
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
