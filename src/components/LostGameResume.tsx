import React, { FC } from 'react';
import { Button } from '@/components/ui/Button';

type LostGameResumeProps = {
  points: number;
  onRestart(): void;
};
const LostGameResume: FC<LostGameResumeProps> = ({ points, onRestart }) => {
  return (
    <div className="absolute flex flex-col space-y-3 justify-center items-center h-full w-full bg-slate-900/80">
      <div className="text-xl font-bold text-gray-300">
        You run out of lives.
      </div>
      <div className="text-xl font-bold text-gray-300">
        Your score: {points} points.
      </div>
      <Button onClick={onRestart} className="bg-slate-900">
        Try Again
      </Button>
    </div>
  );
};

export { LostGameResume };
