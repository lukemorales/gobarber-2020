import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { MotionProps } from 'framer-motion';
import { shade } from 'polished';
import { useTheme } from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

import { DEFAULT_CLICK_HANDLER } from '~/constants';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    isLoading?: boolean;
  };

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    type,
    onClick,
    disabled,
    children,
    isLoading = false,
    ...rest
  } = props;

  const { colors } = useTheme();

  return (
    <S.Container
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      isLoading={isLoading}
      {...rest}
    >
      {isLoading ? (
        <BeatLoader color={shade(0.35, colors.orange)} size={10} />
      ) : (
        children
      )}
    </S.Container>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: DEFAULT_CLICK_HANDLER,
  isLoading: false,
} as ButtonProps;

export default Button;
