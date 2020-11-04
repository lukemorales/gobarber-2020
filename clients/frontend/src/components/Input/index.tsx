import React, { ComponentType, InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';

import * as S from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  icon: ComponentType<IconBaseProps>;
};

const Input = (props: InputProps) => {
  const { name, icon: Icon, ...rest } = props;

  return (
    <S.Container htmlFor={name}>
      {Icon && <Icon size="1.6rem" />}
      <input name={name} {...rest} />
    </S.Container>
  );
};

Input.defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  onChange: () => null,
} as Partial<InputProps>;

export default Input;
