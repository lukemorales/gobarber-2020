import styled, { css } from 'styled-components';

export const Container = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.orange};
    color: ${theme.colors.background};
    border-radius: ${theme.radii.default};
    padding: 1.6rem 2rem;
    width: 100%;

    :disabled {
      opacity: 0.5;
    }
  `}
`;
