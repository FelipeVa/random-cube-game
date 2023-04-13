import React, { FC } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

type GameInformationProps = {
  lives: number;
  points: number;
};

const GameInformation: FC<GameInformationProps> = ({ lives, points }) => {
  return (
    <div className="dark:text-slate-400 flex items-center justify-between">
      <div className="flex">
        <span className="font-medium mr-2">Lives:</span>{' '}
        {Array.from({ length: lives }).map((value, index) => (
          <HeartIcon key={index} className="h-5 w-5 mr-1 text-red-600" />
        ))}
      </div>
      <div>
        <span className="font-medium mr-2">Points: {points}</span>
      </div>
    </div>
  );
};

export { GameInformation };
