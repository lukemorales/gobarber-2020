import styled, { css } from 'styled-components';

type InputContainerProps = { hasError: boolean; isFilled: boolean };

export const Container = styled.label<InputContainerProps>`
  ${({ theme, hasError, isFilled }) => css`
    padding: 1.6rem;
    width: 34rem;
    border-radius: ${theme.radii.default};
    background: ${theme.colors.inputs};
    color: ${theme.colors.white};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    border: 2px solid transparent;

    > svg {
      flex-shrink: 0;
      transition: 180ms ease-in-out;
      margin-right: 1.6rem;
      color: ${isFilled ? theme.colors.orange : theme.colors.grayHard};
    }

    > input {
      flex: 1;
      background: none;
      border: none;
      color: ${theme.colors.white};

      ::placeholder {
        color: ${theme.colors.grayHard};
      }
    }

    :focus-within {
      border-color: ${theme.colors.orange};

      > svg {
        color: ${theme.colors.orange};
      }
    }

    ${hasError &&
    css`
      border-color: ${theme.colors.error} !important;

      > svg {
        color: ${theme.colors.error} !important;
      }
    `}

    + label {
      margin-top: 0.8rem;
    }
  `}
`;
