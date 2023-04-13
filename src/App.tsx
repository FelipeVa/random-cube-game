import { useEffect, useRef, useState } from 'react';
import {
  colors,
  generateArrayOfSizeBySize,
  generateRandomColorForCell,
  getIndexOfMiddleOfArrayOrArray,
  random,
} from '@/utilities/core';
import { Button } from '@/components/ui/Button';
import { GameBox } from '@/components/GameBox';
import { LostGameResume } from '@/components/LostGameResume';
import { GameContainer } from '@/components/GameContainer';
import { GameInformation } from '@/components/GameInformation';

function App() {
  const [winnerColor, setWinnerColor] = useState<string | null>(null);
  const [gameCell, setGameCell] = useState(generateArrayOfSizeBySize(5, '0'));
  const [centerX, centerY] = getIndexOfMiddleOfArrayOrArray(gameCell);
  const [win, setWin] = useState(false);
  const [lives, setLives] = useState(3);
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
    if (lives !== 0) {
      interval.current = setInterval(() => {
        if (canWin && !win) {
          onLose();
        }

        onUpdateGame();
      }, gameTimeout);
    }

    return () =>
      interval.current ? clearInterval(interval.current) : undefined;
  }, [lives, gameTimeout, canWin, win]);

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
    setPoints((points) => points + 1);

    if (gameTimeout !== 1000) {
      setGameGameTimeout((timeout) => timeout - 500);
    }
  };

  const onLose = () => {
    setGameGameTimeout((timeout) => timeout + 500);
    setLives((lifes) => lifes - 1);
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
    setLives(3);
    setPoints(0);
    onGenerate();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center dark:bg-slate-950">
      <div className="flex flex-col gap-2">
        <div className="dark:text-slate-400">
          {lives > 0 ? <GameInformation lives={lives} points={points} /> : null}
        </div>
        <GameContainer size={gameCell.length}>
          {lives === 0 ? (
            <LostGameResume points={points} onRestart={onRestart} />
          ) : null}
          <GameBox cells={gameCell} centers={[centerX, centerY]} />
        </GameContainer>
        {lives > 0 ? <Button onClick={onPick}>Pick!</Button> : null}
      </div>
    </div>
  );
}

export default App;
