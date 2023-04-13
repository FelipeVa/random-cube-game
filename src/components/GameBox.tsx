import React, { FC } from 'react';
import { cn } from '@/utilities/common';

type GameBoxProps = {
  cells: string[][];
  centers: number[];
};
const GameBox: FC<GameBoxProps> = ({ cells, centers }) => {
  const [centerX, centerY] = centers;
  return (
    <>
      {cells.map((cellGroup, indexGroup) => {
        return cellGroup.map((cell, indexCell) => (
          <div
            key={indexCell}
            className={cn('h-24 w-24 bg-gray-100 dark:bg-slate-900', {
              [`${cell} dark:${cell}`]: cell !== '0',
              'bg-red-700': centerX === indexGroup && centerY === indexCell,
            })}
          ></div>
        ));
      })}
    </>
  );
};

export { GameBox };
