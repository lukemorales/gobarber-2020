import styled, { css } from 'styled-components';
import { tint, shade } from 'polished';
import { motion } from 'framer-motion';

export const Container = styled(motion.button)`
  ${({ theme }) => css`
    background: ${theme.colors.orange};
    color: ${theme.colors.background};
    border-radius: ${theme.radii.default};
    padding: 1.6rem 2rem;
    width: 100%;
    transition: 180ms ease-in-out;

    :hover {
      background: ${tint(0.13, theme.colors.orange)};
    }

    :active {
      background: ${shade(0.13, theme.colors.orange)};
    }

    :disabled {
      opacity: 0.5;
    }
  `}
`;
