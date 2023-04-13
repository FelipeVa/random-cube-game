import React, { FC } from 'react';
import { Button } from '@/components/ui/Button';

type StartGameProps = {
  onStart(): void;
};
const StartGame: FC<StartGameProps> = ({ onStart }) => {
  return (
    <div className="absolute flex flex-col space-y-3 justify-center items-center h-full w-full bg-slate-900/80">
      <div className="text-xl font-bold text-gray-300">
        Hey! Click the button below to start playing!
      </div>
      <Button onClick={onStart} className="bg-slate-900">
        Start Game
      </Button>
    </div>
  );
};

export { StartGame };
