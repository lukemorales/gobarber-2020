import styled, { css } from 'styled-components';

import { ToastType } from '~/contexts/toast/types';

type ToastProps = {
  type: ToastType;
};

export const Container = styled.aside<ToastProps>`
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
      top: 16px;
      right: 16px;
      opacity: 0.6;
      border: 0;
      background: transparent;
      color: inherit;
    }

    & + & {
      margin-top: 8px;
    }
  `}
`;
