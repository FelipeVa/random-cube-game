import React, { FC, PropsWithChildren } from 'react';
import { cn } from '@/utilities/common';

type GameContainerProps = PropsWithChildren<{
  size: number;
}>;

const GameContainer: FC<GameContainerProps> = ({ size, children }) => {
  return (
    <div className={cn(`relative max-w-lg grid grid-cols-${size} gap-2`)}>
      {children}
    </div>
  );
};

export { GameContainer };
