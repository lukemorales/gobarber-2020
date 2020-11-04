import styled, { css } from 'styled-components';

export const Container = styled.label`
  ${({ theme }) => css`
    padding: 1.6rem;
    width: 34rem;
    border-radius: ${theme.radii.default};
    background: ${theme.colors.inputs};
    color: ${theme.colors.white};
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > svg {
      margin-right: 1.6rem;
      color: ${theme.colors.grayHard};
      transition: 180ms ease-in-out;
    }

    > input {
      flex: 1;
      background: none;
      border: none;

      ::placeholder {
        color: ${theme.colors.grayHard};
      }
    }

    :focus-within {
      > svg {
        color: ${theme.colors.white};
      }
    }

    + label {
      margin-top: 0.8rem;
    }
  `}
`;
