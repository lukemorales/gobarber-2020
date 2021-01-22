import { PropsWithChildren } from 'react';

import * as S from './styles';

type TooltipProps = {
  title: string;
  color?: string;
  className?: string;
  position?: S.TooltipPosition;
};

const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  const { title, className = '', color, position = 'top', children } = props;

  return (
    <S.Container
      className={className}
      color={color}
      position={position}
      data-tip={title}
    >
      {children}
    </S.Container>
  );
};

export default Tooltip;
