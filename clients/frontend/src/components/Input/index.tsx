import React, { ComponentType, InputHTMLAttributes, useState } from 'react';

import { FieldError, useFormContext } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import Tooltip from '../Tooltip';
import * as S from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  icon: ComponentType<IconBaseProps>;
};

const Input = (props: InputProps) => {
  const { name, icon: Icon, required, ...rest } = props;
  delete rest.value;

  const [isFilled, setIsFilled] = useState(false);

  const { colors } = useTheme();

  const { register, errors, getValues } = useFormContext();
  const inputError = errors[name] as FieldError;

  const handleBlur = () => {
    const inputValue = getValues(name);
    return setIsFilled(!!inputValue);
  };

  return (
    <S.Container htmlFor={name} hasError={!!inputError} isFilled={isFilled}>
      {Icon && <Icon size="1.6rem" />}
      <input
        name={name}
        onBlur={handleBlur}
        ref={register({ required })}
        {...rest}
      />
      {inputError && (
        <Tooltip title={inputError.message || ''} color={colors.error}>
          <FiAlertCircle color={colors.error} size={20} />
        </Tooltip>
      )}
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
