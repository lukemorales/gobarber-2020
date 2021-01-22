import styled, { css } from 'styled-components';
import { tint, shade } from 'polished';
import { motion } from 'framer-motion';

type StyledButtonProps = {
  isLoading: boolean;
};

export const Container = styled(motion.button)<StyledButtonProps>`
  ${({ theme, isLoading }) => css`
    background: ${theme.colors.orange};
    color: ${theme.colors.background};
    border-radius: ${theme.radii.default};
    padding: 1.6rem 2rem;
    width: 100%;
    height: 5.6rem;
    transition: 180ms ease-in-out;

    :hover {
      background: ${tint(0.13, theme.colors.orange)};
    }

    :active {
      background: ${shade(0.13, theme.colors.orange)};
    }

    :disabled {
      opacity: ${isLoading ? 0.9 : 0.5};
    }

    ${isLoading &&
    css`
      > span {
        padding-top: 0.4rem;
      }
    `}
  `}
`;
