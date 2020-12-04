import React, { ComponentType, InputHTMLAttributes, useState } from 'react';

import { FieldError, useFormContext } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';

import * as S from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  icon: ComponentType<IconBaseProps>;
};

const Input = (props: InputProps) => {
  const { name, icon: Icon, required, ...rest } = props;
  delete rest.value;

  const [isFilled, setIsFilled] = useState(false);

  const { register, errors, getValues } = useFormContext();
  const inputError = errors[name] as FieldError;

  const handleBlur = () => {
    const inputValue = getValues(name);
    return setIsFilled(!!inputValue);
  };

  return (
    <S.Container htmlFor={name} hasError={errors[name]} isFilled={isFilled}>
      {Icon && <Icon size="1.6rem" />}
      <input
        name={name}
        onBlur={handleBlur}
        ref={register({ required })}
        {...rest}
      />
      {inputError && <S.ErrorMessage>{inputError.message}</S.ErrorMessage>}
    </S.Container>
  );
};

Input.defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  required: false,
  onChange: () => null,
} as Partial<InputProps>;

export default Input;
