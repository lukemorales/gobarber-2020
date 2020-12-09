import styled, { css } from 'styled-components';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

type TooltipContainerProps = {
  color?: string;
  position: TooltipPosition;
};

const tooltipPosition = {
  top: (color: string) => css`
    ::before,
    ::after {
      left: 50%;
      transform: translateX(-50%);
    }

    ::before {
      bottom: calc(100% - 0.4rem);
    }

    ::after {
      content: '';
      border-style: solid;
      border-width: 0.8rem 0.8rem 0 0.8rem;
      border-color: ${color} transparent transparent transparent;
      bottom: calc(100% - 1.2rem);
    }
  `,
  right: (color: string) => css`
    ::before,
    ::after {
      top: 50%;
      transform: translateY(calc(-50% - 3px));
    }

    ::before {
      left: calc(100% + 1rem);
    }

    ::after {
      border-width: 0.8rem 0.8rem 0.8rem 0;
      border-color: transparent ${color} transparent transparent;
      left: calc(100% + 0.4rem);
    }
  `,
  bottom: (color: string) => css`
    ::before,
    ::after {
      left: 50%;
      transform: translateX(-50%);
    }

    ::before {
      top: calc(100% - 0.8rem);
    }

    ::after {
      top: calc(100% - 1.6rem);
      border-width: 0 0.8rem 0.8rem 0.8rem;
      border-color: transparent transparent ${color} transparent;
    }
  `,
  left: (color: string) => css`
    ::before,
    ::after {
      top: 50%;
      transform: translateY(calc(-50% - 3px));
    }

    ::before {
      right: calc(100% + 1rem);
    }

    ::after {
      border-width: 0.6rem 0 0.6rem 0.6rem;
      border-color: transparent transparent transparent ${color};
      right: calc(100% + 0.4rem);
    }
  `,
};

export const Container = styled.div<TooltipContainerProps>`
  ${({ theme, color, position }) => css`
    position: relative;
    padding: 1.6rem 0;
    margin: -1.6rem 0;
    cursor: help;

    > svg {
      flex-shrink: 0;
    }

    ::before,
    ::after {
      z-index: 2;
      pointer-events: none;
      display: block;
      position: absolute;
      opacity: 0;
      transition: 250ms ease-in-out;
    }

    ::before {
      content: attr(data-tip);
      background: ${color || theme.colors.orange};
      color: ${theme.colors.white};
      padding: 0.4rem 0.8rem;
      border-radius: 0.4rem;
      max-width: 14rem;
      width: max-content;
      font-size: 1.2rem;
      text-align: center;
    }

    ::after {
      content: '';
      border-style: solid;
    }

    ${tooltipPosition[position](color || theme.colors.orange)}

    :hover {
      ::before,
      ::after {
        pointer-events: all;
        opacity: 1;
      }
    }
  `}
`;
