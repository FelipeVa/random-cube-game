import { useEffect, useRef, useState } from 'react';
import {
  generateArrayOfSizeBySize,
  getIndexOfMiddleOfArrayOrArray,
} from './utilities/core';
import { cn } from './utilities/common';
import { Button } from '@/components/ui/Button';
import { HeartIcon } from '@heroicons/react/24/solid';

const colors = [
  'bg-yellow-800',
  'bg-amber-600',
  'bg-lime-500',
  'bg-green-800',
  'bg-emerald-400',
  'bg-teal-600',
  'bg-cyan-900',
  'bg-sky-500',
  'bg-indigo-600',
  'bg-violet-200',
  'bg-purple-600',
  'bg-pink-600',
];

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateRandomColorForCell = (
  colorBag: string[],
  winnerColor: string
): string | null => {
  let randomColor = colors[random(0, 7)];
  const winnerColors = [winnerColor];
  const isWinnerColorTwoTimes =
    colorBag.filter((color) => color === winnerColor).length === 2;

  if (colorBag.length === 8) {
    return null;
  }

  if (
    !isWinnerColorTwoTimes &&
    randomColor === winnerColor &&
    winnerColors.length !== 2
  ) {
    winnerColors.push(winnerColor);

    return winnerColor;
  }

  if (colorBag.includes(randomColor)) {
    return generateRandomColorForCell(colorBag, winnerColor);
  }

  return randomColor;
};

function App() {
  const [winnerColor, setWinnerColor] = useState<string | null>(null);
  const [gameCell, setGameCell] = useState(generateArrayOfSizeBySize(5, '0'));
  const [centerX, centerY] = getIndexOfMiddleOfArrayOrArray(gameCell);
  const [win, setWin] = useState(false);
  const [lifes, setLifes] = useState(3);
  const [points, setPoints] = useState(0);
  const [gameTimeout, setGameGameTimeout] = useState(3000);
  const flattenGameCell = gameCell.flatMap((group) => group.flat());
  const canWin =
    flattenGameCell.filter((cell) => cell === winnerColor).length === 2;
  const interval = useRef<null | NodeJS.Timer>(null);

  const generateCellColors = (winnerColor: string) => {
    const colorBag: string[] = [];
    const coloredCells = gameCell.map((groupCell, indexGroup) =>
      groupCell.map((cell, indexCell) => {
        if (centerX === indexGroup && centerY === indexCell) {
          return cell;
        }

        if (centerX === indexGroup || centerY === indexCell) {
          const randomColor = generateRandomColorForCell(colorBag, winnerColor);

          if (randomColor) {
            colorBag.push(randomColor);
          }

          return randomColor ? randomColor : cell;
        }

        return cell;
      })
    );

    setGameCell(coloredCells);
  };

  useEffect(() => {
    if (lifes !== 0) {
      interval.current = setInterval(() => {
        if (canWin && !win) {
          onLose();
        }

        onUpdateGame();
      }, gameTimeout);
    }

    return () =>
      interval.current ? clearInterval(interval.current) : undefined;
  }, [lifes, gameTimeout, canWin, win]);

  const onUpdateGame = () => {
    const _winnerColor = colors[random(0, 11)];
    setWin(false);
    setWinnerColor(_winnerColor);
    generateCellColors(_winnerColor);
  };

  const onGenerate = () => {
    const _winnerColor = colors[random(0, 11)];
    generateCellColors(_winnerColor);
  };

  const onWin = () => {
    setWin(true);
    setPoints(points => points + 1);

    if (gameTimeout !== 1000) {
      setGameGameTimeout((timeout) => timeout - 500);
    }
  };

  const onLose = () => {
    setGameGameTimeout((timeout) => timeout + 500);
    setLifes((lifes) => lifes - 1);
  };

  const onPick = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      onGenerate();
    }

    if (!canWin) {
      return onLose();
    }

    onWin();
  };

  const onRestart = () => {
    setGameGameTimeout(3000);
    setLifes(3);
    setPoints(0);
    onGenerate();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center dark:bg-slate-950">
      <div className="flex flex-col gap-2">
        <div className="dark:text-slate-400 flex items-center justify-between">
          {lifes > 0 ? (
            <>
              <div className="flex">
                <span className="font-medium mr-2">Lives:</span>{' '}
                {Array.from({ length: lifes }).map((value, index) => (
                  <HeartIcon
                    key={index}
                    className="h-5 w-5 mr-1 text-red-600"
                  />
                ))}
              </div>
              <div>
                <span className="font-medium mr-2">Points: {points}</span>
              </div>
            </>
          ) : null}
        </div>
        <div
          className={cn(
            `relative max-w-lg grid grid-cols-${gameCell.length} gap-2`
          )}
        >
          {lifes === 0 ? (
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
          ) : null}
          {gameCell.map((cellGroup, indexGroup) => {
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
        </div>
        {lifes > 0 ? (
          <Button onClick={onPick} className="bg-slate-900">
            Pick!
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
