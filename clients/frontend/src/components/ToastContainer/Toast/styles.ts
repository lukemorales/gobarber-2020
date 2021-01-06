import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { ToastType } from '~/contexts/toast/types';

type ToastProps = {
  type: ToastType;
};

export const Container = styled(motion.aside)<ToastProps>`
  ${({ theme, type }) => css`
    width: 360px;
    position: relative;
    padding: 16px 32px 16px 16px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;

    background: ${theme.colors.toasts[type].background};
    color: ${theme.colors.toasts[type].color};

    > svg {
      margin: 4px 12px 0 0;
      flex-shrink: 0;
    }

    > div {
      flex: 1;

      > p {
        margin-top: 4px;
        font-size: 14px;
        opacity: 0.8;
        line-height: 20px;
      }
    }

    > button {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 16px 16px 0 0;
      opacity: 0.6;
      border: 0;
      background: transparent;
      color: inherit;
      cursor: pointer;
      pointer-events: all;
    }

    & + & {
      margin-top: 12px;
    }
  `}
`;
